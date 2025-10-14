// app/projects/[slug]/page.tsx
import { PortableText, type SanityDocument } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]`;

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
};

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
            <Link href="/projects" className="hover:underline">
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

            <div className="text-sm text-gray-500">
                Updated: {new Date(project._updatedAt ?? project._createdAt ?? Date.now()).toLocaleDateString()}
            </div>

            {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((t: string) => (
                        <span key={t} className="text-xs rounded-full border px-2 py-0.5 text-gray-600">
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
                    className="inline-block mt-4 text-blue-600 hover:underline font-medium"
                >
                    🔗 Visit project
                </a>
            )}

            <div className="prose mt-6">
                {Array.isArray(project.body) && <PortableText value={project.body} />}
            </div>
        </main>
    );
}
