// app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const PROJECTS_QUERY = `*[
  _type == "project" && defined(slug.current)
]|order(_updatedAt desc)[0...12]{
  _id,
  title,
  slug,
  _updatedAt,
  image,
  tags
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

export default async function ProjectsPage() {
    const projects = await client.fetch<SanityDocument[]>(PROJECTS_QUERY);

    return (
        <section className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Projects</h1>

            <div className="flex justify-between flex-wrap gap-6">
                {projects.map((project) => {
                    const imageUrl = project.image
                        ? urlFor(project.image)?.width(800).height(400).url()
                        : null;

                    return (
                        <div key={project._id} className="w-full sm:w-[48%] lg:w-[30%]">
                            <Link href={`/projects/${project.slug.current}`} className="block group">
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={project.title}
                                        width={800}
                                        height={400}
                                        className="rounded-lg mb-2 transition-transform duration-200 group-hover:scale-[1.02] object-cover"
                                    />
                                )}
                                <h2 className="text-xl font-semibold">{project.title}</h2>

                                {Array.isArray(project.tags) && project.tags.length > 0 && (
                                    <div className="mt-2 flex justify-start flex-wrap gap-2">
                                        {project.tags.map((t: string) => (
                                            <span
                                                key={t}
                                                className="text-xs rounded-full border px-2 py-0.5 text-gray-300"
                                            >
                                                {t}
                                            </span>
                                        ))}
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
