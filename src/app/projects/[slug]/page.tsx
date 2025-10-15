// app/projects/[slug]/page.tsx
import { PortableText, type SanityDocument } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import type { Metadata } from "next";

const PROJECT_QUERY = /* groq */ `*[_type == "project" && slug.current == $slug][0]{
  _id, title, slug, _createdAt, _updatedAt, image, href, tags, body,
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

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const options = { next: { revalidate: 30 } };

type ProjectDoc = SanityDocument & {
    title: string;
    href?: string;
    image?: SanityImageSource;
    tags?: string[];
    _updatedAt?: string;
    _createdAt?: string;
    body?: PortableTextBlock[];
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

/** ---------- SEO через generateMetadata ---------- */
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const doc = await client.fetch<ProjectDoc>(PROJECT_QUERY, { slug }, options);
    const s = doc?.seo;

    // Выбираем картинку для превью: OG.image → metaImage → обычное image
    const imgSrc: SanityImageSource | undefined =
        s?.openGraph?.image ?? s?.metaImage ?? doc?.image;
    const ogImageUrl = imgSrc ? urlFor(imgSrc)?.width(1200).height(630).url() : undefined;

    // og:url: если нет в openGraph, берём canonical
    const ogUrl = s?.openGraph?.url ?? s?.canonicalUrl;

    // Разрешённые значения для openGraph.type и twitter.card
    const OG_TYPES = [
        "website",
        "article",
        "book",
        "profile",
        "music.song",
        "music.album",
        "music.playlist",
        "music.radio_station",
        "video.movie",
        "video.episode",
        "video.tv_show",
        "video.other",
    ] as const;
    type OgType = (typeof OG_TYPES)[number];

    const TW_CARDS = ["summary", "summary_large_image", "app", "player"] as const;
    type TwCard = (typeof TW_CARDS)[number];

    const toSafeOgType = (v?: string | null): OgType => {
        const t = (v ?? "").toLowerCase();
        return (OG_TYPES as readonly string[]).includes(t) ? (t as OgType) : "website";
        // product → website и т.п.
    };

    const toSafeTwCard = (v?: string | null): TwCard => {
        const t = (v ?? "").toLowerCase();
        return (TW_CARDS as readonly string[]).includes(t) ? (t as TwCard) : "summary_large_image";
    };

    const safeOgType = toSafeOgType(s?.openGraph?.type);
    const safeTwCard = toSafeTwCard(s?.twitter?.card);

    return {
        title: s?.title ?? doc?.title,
        description: s?.description,
        keywords: s?.keywords,
        alternates: s?.canonicalUrl ? { canonical: s.canonicalUrl } : undefined,
        robots: {
            index: s?.robots?.noIndex !== true,
            follow: s?.robots?.noFollow !== true,
        },
        openGraph: {
            type: safeOgType,
            url: ogUrl,
            title: s?.openGraph?.title ?? s?.title ?? doc?.title,
            description: s?.openGraph?.description ?? s?.description,
            siteName: s?.openGraph?.siteName,
            images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
        },
        twitter: {
            card: safeTwCard,
            site: s?.twitter?.site,
            creator: s?.twitter?.creator,
            title: s?.twitter?.title ?? s?.title ?? doc?.title,
            description: s?.twitter?.description ?? s?.description,
            images: ogImageUrl ? [ogImageUrl] : undefined,
        },
    };
}
/** ---------- /SEO через generateMetadata ---------- */

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const project = await client.fetch<ProjectDoc>(PROJECT_QUERY, await params, options);

    const projectImageUrl = project?.image
        ? urlFor(project.image)?.width(1920).height(1080).url()
        : null;

    const href = project?.href ?? null;

    return (
        <main className="container mx-auto min-h-screen p-8 flex flex-col gap-4">
            <Link href="/projects" className="hover:underline bg-[#95adbe] w-fit rounded-xl px-3 py-1 text-black">
                ← Back to projects
            </Link>

            {projectImageUrl && (
                <Image
                    src={projectImageUrl}
                    alt={project.title}
                    className="object-cover rounded-xl"
                    width={1920}
                    height={1080}
                    priority
                />
            )}

            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>

            <div className="prose">
                {Array.isArray(project.body) && <PortableText value={project.body} />}
            </div>

            <div className="text-sm text-gray-500">
                Updated: {new Date(project._updatedAt ?? project._createdAt ?? Date.now()).toLocaleDateString()}
            </div>

            {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((t: string) => (
                        <span key={t} className="text-xs rounded-full border px-2 py-0.5 text-gray-300">
                            {t}
                        </span>
                    ))}
                </div>
            )}

            {href && (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-white uppercase text-center rounded-xl shadow-xl py-5 bg-[#574f7d] hover:underline font-medium"
                >
                    Visit project
                </a>
            )}

        </main>
    );
}
