import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Создаём builder для Sanity изображений
const builder = imageUrlBuilder({
    projectId: "0unkcvxg",
    dataset: "production",
});

// Хелпер для получения ссылок на изображения
function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Запрос постов
const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  image
}`;

const options = { next: { revalidate: 30 } };

// Асинхронный компонент (серверный)
export default async function LatestPosts() {
    const posts = await client.fetch(POSTS_QUERY, {}, options);

    return (
        <section className="dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        Recent posts
                    </h1>
                </div>

                <hr className="my-8 border-gray-200 dark:border-gray-700" />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {posts.length === 0 && (
                        <p className="text-gray-400">No posts yet...</p>
                    )}

                    {posts.map((post: any) => {
                        const imageUrl = post.image
                            ? urlFor(post.image).width(550).height(310).url()
                            : "https://via.placeholder.com/550x310?text=No+Image";

                        return (
                            <div key={post._id}>
                                <img
                                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                                    src={imageUrl}
                                    alt={post.title}
                                    width={550}
                                    height={310}
                                />

                                <div className="mt-8">
                                    <span className="text-blue-500 uppercase">Blog</span>

                                    <Link href={`/blog/${post.slug.current}`}>
                                        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white hover:underline">
                                            {post.title}
                                        </h1>
                                    </Link>

                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        Published: {new Date(post.publishedAt).toLocaleDateString()}
                                    </p>

                                    <div className="flex items-center justify-between mt-4">
                                        <Link
                                            href={`/blog/${post.slug.current}`}
                                            className="inline-block text-blue-500 underline hover:text-blue-400"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
