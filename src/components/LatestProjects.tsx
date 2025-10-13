// app/(site)/_components/LatestProjects.tsx
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Тип проекта под выбранную проекцию
type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  _updatedAt: string; // ISO-string из Sanity
  image?: SanityImageSource | null;
  tags?: string[] | null;
};

// Builder Sanity изображений
const builder = imageUrlBuilder({
  projectId: "0unkcvxg",
  dataset: "production",
});

// Хелпер для получения ссылок на изображения
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Запрос проектов (берём ровно 3 для одной строки)
const PROJECTS_QUERY = `*[
  _type == "project" && defined(slug.current)
]|order(_updatedAt desc)[0...3]{
  _id,
  title,
  slug,
  _updatedAt,
  image,
  tags
}`;

const options = { next: { revalidate: 30 } };

// Асинхронный серверный компонент
export default async function LatestProjects() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);

  return (
    <section className="dark:bg-gray-900">
      <div className="container mx-auto p-0!">

        {/* Один ряд на флексах: на md+ — 3 колонки без переноса */}
        <div className="flex flex-col gap-8 md:flex-row md:flex-nowrap">
          {projects.length === 0 && (
            <p className="text-gray-400">No projects yet...</p>
          )}

          {projects.map((project) => {
            const imageUrl = project.image
              ? urlFor(project.image).width(1920).height(1080).url()
              : "https://cdn.sanity.io/images/0unkcvxg/production/5cceef968ad7f4e95d1b6e13b1278a140a304ca8-1536x1024.webp";

            return (
              <div
                key={project._id}
                className="md:basis-1/3 md:flex-1"
              >
                <Image
                  className="object-cover object-center w-full h-[280px] rounded-tl-xl rounded-tr-xl lg:h-80"
                  src={imageUrl}
                  alt={project.title}
                  width={1920}
                  height={1080}
                />

                <div className="bg-[#404040] rounded-bl-xl rounded-br-xl shadow-xl p-5">

                  {project.tags?.length ? (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-1 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 syne-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <Link href={`/projects/${project.slug.current}`}>
                    <h2 className="text-xl font-semibold text-white hover:underline">
                      {project.title}
                    </h2>
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="inline-block bg-[#574f7d] hover:bg-[#95adbe] hover:text-black uppercase syne-medium px-3 py-1 rounded-xl"
                    >
                      View project
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
