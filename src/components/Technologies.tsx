import Image from "next/image";

const tech = [
    { alt: "React", src: "https://cdn.sanity.io/images/0unkcvxg/production/25288751b8628bf8c92158a6f78b102c80818de1-512x512.svg" },
    { alt: "Next.JS", src: "https://cdn.sanity.io/images/0unkcvxg/production/249e5c6d2a614af9a2364c2af9ee737a9c9b2118-512x512.png" },
    { alt: "Sanity CMS", src: "https://cdn.sanity.io/images/0unkcvxg/production/9e7aae55b7bee12b491495c02b02bc37b8516b07-512x512.png" },
    { alt: "Supabase", src: "https://cdn.sanity.io/images/0unkcvxg/production/18e6c958a4554e247e2a0d33c88066f8b6b0ed4d-512x512.svg" },
    { alt: "Payload CMS", src: "https://cdn.sanity.io/images/0unkcvxg/production/0e8b2fc1cdfa4812673a1772a532fbcf69afc007-512x512.svg" },
    { alt: "PostgreSQL", src: "https://cdn.sanity.io/images/0unkcvxg/production/544c6137833764d85b0c140c821c5ceb9a9e5026-512x512.svg" },
    { alt: "NPM", src: "https://cdn.sanity.io/images/0unkcvxg/production/985648c4742a4ff4fef50bf837b41a63588bbdfe-512x512.svg" },
    { alt: "Three.JS", src: "https://cdn.sanity.io/images/0unkcvxg/production/65547edf76a800efece1ff76f39e740396be6acb-512x512.svg" },
    { alt: "ShadCN UI", src: "https://cdn.sanity.io/images/0unkcvxg/production/1edbc9645fa8f68780c0ef667523f1791fcf8ed1-512x512.svg" },
    { alt: "Github", src: "https://cdn.sanity.io/images/0unkcvxg/production/8862305694b9814c4bf7198d5f22bb62acfcace9-512x512.svg" },
    { alt: "Figma", src: "https://cdn.sanity.io/images/0unkcvxg/production/3b0d2a8c1a286628108ef4558b1a87d38c044731-512x512.svg" },
    { alt: "WordPress", src: "https://cdn.sanity.io/images/0unkcvxg/production/96e53e93ff55baeb86e67073834ba9df3de90b75-512x512.svg" },
];

export default function Technologies() {
    return (
        <section className="container mx-auto mb-8 p-0!">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
                {tech.map((t) => (
                    <div
                        key={t.alt}
                        className="bg-[#4e4e4e] rounded-2xl shadow-xl p-4 sm:p-5 flex items-center justify-center"
                    >
                        <Image alt={t.alt} src={t.src} width={35} height={35} />
                    </div>
                ))}
            </div>
        </section>
    );
}
