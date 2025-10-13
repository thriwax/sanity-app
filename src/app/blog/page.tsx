import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  image
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

export default async function BlogPage() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

    return (
        <section className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>

            <div className="flex flex-wrap gap-6">
                {posts.map((post) => {
                    const imageUrl = post.image
                        ? urlFor(post.image)?.width(800).height(400).url()
                        : null;

                    return (
                        <div key={post._id} className="w-full sm:w-[48%] lg:w-[30%]">
                            <Link href={`/blog/${post.slug.current}`} className="block group">
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={post.title}
                                        width={800}
                                        height={400}
                                        className="rounded-lg mb-2 transition-transform duration-200 group-hover:scale-[1.02] object-cover"
                                    />
                                )}
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-sm text-gray-500">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
