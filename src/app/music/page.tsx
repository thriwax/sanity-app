import Link from "next/link";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Music | Fedor Tatarintsev",
    description: "Archive Page for Music produced by Fedor Tatarintsev",
};

const MUSIC_LIST_QUERY = `*[
  _type == "music" && defined(slug.current)
]|order(_updatedAt desc)[0...12]{
  _id,
  artist,
  title,
  slug,
  _updatedAt,
  genre,
  cover
}`;

export const revalidate = 30;

const { projectId, dataset } = client.config();
const urlFor = (src: SanityImageSource | undefined) =>
    src && projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(src)
        : null;

export default async function MusicPage() {
    const items = await client.fetch<SanityDocument[]>(MUSIC_LIST_QUERY);

    return (
        <section className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Music</h1>

            <div className="flex justify-between flex-wrap gap-6">
                {items.map((doc) => {
                    const coverUrl = doc.cover
                        ? urlFor(doc.cover)?.width(800).height(800).fit("crop").url()
                        : null;

                    return (
                        <div key={doc._id} className="w-full sm:w-[48%] lg:w-[30%]">
                            <Link
                                href={`/music/${doc.slug.current}`}
                                className="block group rounded-lg border p-3 hover:shadow-md transition"
                            >
                                {coverUrl && (
                                    <Image
                                        src={coverUrl}
                                        alt={`${doc.artist} — ${doc.title}`}
                                        width={800}
                                        height={800}
                                        className="rounded-md mb-3 object-cover w-full h-48 sm:h-56 lg:h-60"
                                    />
                                )}

                                <h2 className="text-xl font-semibold">
                                    {doc.artist} — {doc.title}
                                </h2>

                                {doc.genre && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="text-xs rounded-full border px-2 py-0.5 text-gray-300">
                                            {doc.genre}
                                        </span>
                                    </div>
                                )}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
