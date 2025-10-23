// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

// 👇 Подправь при необходимости
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://thriwax.ru";

// Если у тебя другая структура архивов — поменяй шаблоны ниже:
const BLOG_ARCHIVE_PATH = (page: number) => `/blog/page/${page}`;
const PROJECTS_ARCHIVE_PATH = (page: number) => `/projects/page/${page}`;

// Задай свои размеры страниц (так же как у тебя в UI "Show more"):
const PAGE_SIZE_BLOG = 9;
const PAGE_SIZE_PROJECTS = 9;

type Item = { slug: string; updated: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Посты
  const posts = await client.fetch<Item[]>(
    `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "updated": coalesce(_updatedAt, _createdAt)
    } | order(updated desc)`
  );

  // Проекты
  const projects = await client.fetch<Item[]>(
    `*[_type == "project" && defined(slug.current)]{
      "slug": slug.current,
      "updated": coalesce(_updatedAt, _createdAt)
    } | order(updated desc)`
  );

  // Музыка
  const music = await client.fetch<Item[]>(
    `*[_type == "music" && defined(slug.current)]{
      "slug": slug.current,
      "updated": coalesce(_updatedAt, _createdAt)
    } | order(updated desc)`
  );

  // Подсчёт для архивов
  const postsCount = await client.fetch<number>(`count(*[_type == "post"])`);
  const projectsCount = await client.fetch<number>(`count(*[_type == "project"])`);

  const blogPages = Math.max(1, Math.ceil(postsCount / PAGE_SIZE_BLOG));
  const projectPages = Math.max(1, Math.ceil(projectsCount / PAGE_SIZE_PROJECTS));

  const now = new Date().toISOString();

  // Базовые статические страницы
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts[0]?.updated ?? now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: projects[0]?.updated ?? now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/music`,
      lastModified: music[0]?.updated ?? now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Посты
  for (const p of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${encodeURIComponent(p.slug)}`,
      lastModified: p.updated,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Проекты
  for (const pr of projects) {
    entries.push({
      url: `${SITE_URL}/projects/${encodeURIComponent(pr.slug)}`,
      lastModified: pr.updated,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Музыка
  for (const m of music) {
    entries.push({
      url: `${SITE_URL}/music/${encodeURIComponent(m.slug)}`,
      lastModified: m.updated,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  // Архивы (блог/проекты)
  for (let page = 2; page <= blogPages; page++) {
    entries.push({
      url: `${SITE_URL}${BLOG_ARCHIVE_PATH(page)}`,
      lastModified: posts[0]?.updated ?? now,
      changeFrequency: "daily",
      priority: 0.5,
    });
  }

  for (let page = 2; page <= projectPages; page++) {
    entries.push({
      url: `${SITE_URL}${PROJECTS_ARCHIVE_PATH(page)}`,
      lastModified: projects[0]?.updated ?? now,
      changeFrequency: "weekly",
      priority: 0.4,
    });
  }

  return entries;
}
