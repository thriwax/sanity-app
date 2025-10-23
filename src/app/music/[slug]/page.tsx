import { type SanityDocument } from "next-sanity";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import MusicPlayer from "@/components/MusicPlayer";

const MUSIC_QUERY = /* groq */ `*[_type == "music" && slug.current == $slug][0]{
  _id,
  artist,
  title,
  slug,
  _createdAt,
  _updatedAt,
  description,
  genre,
  cover,                                 // <-- обложка
  appleMusicUrl,
  spotifyUrl,
  soundcloudUrl,
  "audioUrl": audio.asset->url,
  seo{
    title,
    description,
    keywords,
    canonicalUrl,
    metaImage,
    robots{ noIndex, noFollow },
    openGraph{ title, description, siteName, type, image, url },
    twitter{ card, site, title, description, creator }
  }
}`;

const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (src: SanityImageSource | undefined) =>
    src && projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(src) : null;

type MusicDoc = SanityDocument & {
    artist: string;
    title: string;
    slug?: { current: string };
    _createdAt?: string;
    _updatedAt?: string;
    description?: string;
    genre?: string;
    cover?: SanityImageSource;        // <-- тип обложки
    appleMusicUrl?: string;
    spotifyUrl?: string;
    soundcloudUrl?: string;
    audioUrl?: string;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
        canonicalUrl?: string;
        metaImage?: SanityImageSource;
        robots?: { noIndex?: boolean; noFollow?: boolean };
        openGraph?: {
            title?: string;
            description?: string;
            siteName?: string;
            type?: string; // будет санитизировано
            image?: SanityImageSource;
            url?: string;
        };
        twitter?: {
            card?: string; // будет санитизировано
            site?: string;
            title?: string;
            description?: string;
            creator?: string; // поле есть в данных
        };
    };
};

/** ---------- SEO ---------- */
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const doc = await client.fetch<MusicDoc>(MUSIC_QUERY, { slug }, options);
    const s = doc?.seo;

    const OG_TYPES = [
        "website", "article", "book", "profile",
        "music.song", "music.album", "music.playlist", "music.radio_station",
        "video.movie", "video.episode", "video.tv_show", "video.other",
    ] as const;
    type OgType = (typeof OG_TYPES)[number];
    const TW_CARDS = ["summary", "summary_large_image", "app", "player"] as const;
    type TwCard = (typeof TW_CARDS)[number];

    const toSafeOgType = (v?: string | null): OgType =>
        (OG_TYPES as readonly string[]).includes((v ?? "").toLowerCase())
            ? ((v ?? "").toLowerCase() as OgType)
            : "music.album";
    const toSafeTwCard = (v?: string | null): TwCard =>
        (TW_CARDS as readonly string[]).includes((v ?? "").toLowerCase())
            ? ((v ?? "").toLowerCase() as TwCard)
            : "summary_large_image";

    // OG-изображение: приоритет SEO.image → SEO.metaImage → cover
    let ogImageUrl: string | undefined;
    const imgSrc = s?.openGraph?.image ?? s?.metaImage ?? doc?.cover;
    if (typeof imgSrc === "string") {
        ogImageUrl = imgSrc;
    } else if (imgSrc) {
        ogImageUrl = urlFor(imgSrc)?.width(1200).height(630).fit("crop").url() || undefined;
    }

    return {
        title: s?.title ?? (doc ? `${doc.artist} — ${doc.title}` : undefined),
        description: s?.description ?? doc?.description,
        keywords: s?.keywords,
        alternates: s?.canonicalUrl ? { canonical: s.canonicalUrl } : undefined,
        robots: {
            index: s?.robots?.noIndex !== true,
            follow: s?.robots?.noFollow !== true,
        },
        openGraph: {
            type: toSafeOgType(s?.openGraph?.type),
            url: s?.openGraph?.url ?? s?.canonicalUrl,
            title: s?.openGraph?.title ?? s?.title ?? (doc ? `${doc.artist} — ${doc.title}` : undefined),
            description: s?.openGraph?.description ?? s?.description ?? doc?.description,
            siteName: s?.openGraph?.siteName,
            images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
        },
        twitter: {
            card: toSafeTwCard(s?.twitter?.card),
            site: s?.twitter?.site,
            creator: s?.twitter?.creator,
            title: s?.twitter?.title ?? s?.title ?? (doc ? `${doc.artist} — ${doc.title}` : undefined),
            description: s?.twitter?.description ?? s?.description ?? doc?.description,
            images: ogImageUrl ? [ogImageUrl] : undefined,
        },
    };
}
/** ---------- /SEO ---------- */

export default async function MusicPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const music = await client.fetch<MusicDoc>(MUSIC_QUERY, await params, options);

    // URL обложек
    const pageCoverUrl = music?.cover
        ? urlFor(music.cover)?.width(1600).height(1600).fit("crop").url()
        : null;
    const playerCoverUrl = music?.cover
        ? urlFor(music.cover)?.width(600).height(600).fit("crop").url()
        : null;

    return (
        <main className="container mx-auto min-h-screen p-6 sm:p-8">
            <Link
                href="/music"
                className="hover:underline bg-[#95adbe] w-fit rounded-xl px-3 py-1 text-black"
            >
                ← Back to music
            </Link>

            {/* ДВЕ КОЛОНКИ: обложка слева 50%, контент справа */}
            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                {/* LEFT: COVER (50%) */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-800">
                    {pageCoverUrl ? (
                        <Image
                            src={pageCoverUrl}
                            alt={`${music.artist} — ${music.title}`}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-700" />
                    )}
                </div>

                {/* RIGHT: INFO + PLAYER + LINKS */}
                <div className="flex flex-col gap-5">
                    <header>
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            {music.artist} — {music.title}
                        </h1>
                        {music.genre && (
                            <div className="mt-2">
                                <span className="text-xs rounded-full border px-2 py-0.5 text-gray-300">
                                    {music.genre}
                                </span>
                            </div>
                        )}
                    </header>

                    {music.description && (
                        <p className="text-base leading-relaxed whitespace-pre-line text-zinc-200">
                            {music.description}
                        </p>
                    )}

                    {/* Кнопки стримингов с иконками */}
                    <div className="mt-2 flex flex-wrap gap-3">
                        {music.appleMusicUrl && (
                            <a
                                href={music.appleMusicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-800 transition"
                                aria-label="Open in Apple Music"
                            >
                                {/* Apple icon */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                    <path d="M16.365 1.43c0 1.14-.47 2.2-1.2 2.98-.77.84-1.96 1.5-3.1 1.41-.11-1.11.43-2.3 1.19-3.08.81-.84 2.23-1.44 3.11-1.31ZM20.81 17.3c-.52 1.18-.77 1.69-1.44 2.72-.93 1.42-2.24 3.2-3.86 3.22-1.45.03-1.82-.93-3.8-.93-1.98 0-2.41.9-3.85.95-1.62.06-2.86-1.53-3.8-2.96C2.1 18.11.76 14.36 2.5 11.3c.86-1.5 2.4-2.44 4.08-2.47 1.6-.03 3.1 1.05 3.81 1.05.71 0 2.61-1.3 4.4-1.11.75.03 2.85.31 4.2 2.34-3.99 2.18-3.35 7.9-.18 9.19Z" />
                                </svg>
                                Apple Music
                            </a>
                        )}

                        {music.spotifyUrl && (
                            <a
                                href={music.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/40 bg-emerald-950/60 px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-900/60 transition"
                                aria-label="Open in Spotify"
                            >
                                {/* Spotify icon */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                    <path d="M12 1.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Zm5.13 15.02a.75.75 0 0 1-1.03.25c-2.82-1.73-6.38-2.12-10.56-1.18a.75.75 0 0 1-.33-1.46c4.56-1.05 8.49-.6 11.62 1.32.35.21.47.66.3 1.07Zm1.37-3.02a.93.93 0 0 1-1.27.3c-3.22-1.96-8.13-2.53-11.94-1.4a.94.94 0 1 1-.53-1.8c4.3-1.26 9.69-.63 13.36 1.56.45.27.6.86.38 1.34Zm.12-3.13c-3.86-2.28-10.24-2.49-13.93-1.38a1.12 1.12 0 1 1-.64-2.14c4.26-1.27 11.32-1.03 15.7 1.57a1.12 1.12 0 0 1-1.13 1.95Z" />
                                </svg>
                                Spotify
                            </a>
                        )}

                        {music.soundcloudUrl && (
                            <a
                                href={music.soundcloudUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-orange-900/40 bg-orange-950/60 px-3 py-2 text-sm text-orange-100 hover:bg-orange-900/60 transition"
                                aria-label="Open in SoundCloud"
                            >
                                {/* SoundCloud icon */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                    <path d="M17.5 10.5c-.3 0-.6.03-.88.1a4.5 4.5 0 0 0-8.77.9v.03A2.75 2.75 0 1 0 7.75 18h9.75A3.5 3.5 0 1 0 17.5 10.5Z" />
                                </svg>
                                SoundCloud
                            </a>
                        )}
                    </div>
                </div>
            </section>
            <section className="mt-8 mb-8">
                {/* Плеер (с нашей обложкой) */}
                {music.audioUrl && (
                    <div>
                        <MusicPlayer
                            src={music.audioUrl}
                            title={music.title}
                            artist={music.artist}
                            coverUrl={playerCoverUrl}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}
