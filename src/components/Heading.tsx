// src/components/Heading.tsx
import { JSX, ReactNode } from "react";

type HeadingProps = {
    /** Уровень заголовка: 1..6 */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Контент заголовка */
    children: ReactNode;
    /** Доп. классы для тега h1..h6 */
    className?: string;
};

export default function Heading({
    level = 2,
    children,
    className = "",
}: HeadingProps) {
    const lvl = Math.min(6, Math.max(1, level));
    const Tag = `h${lvl}` as keyof JSX.IntrinsicElements;

    return (
        <div className="container mx-auto flex flex-row items-center gap-4 bg-[#404040] rounded-xl shadow-xl px-4 py-3 mb-8">
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16 0L17.8885 10.1877L25.4046 3.05573L20.9443 12.4078L31.2169 11.0557L22.1115 16L31.2169 20.9443L20.9443 19.5922L25.4046 28.9443L17.8885 21.8123L16 32L14.1115 21.8123L6.59544 28.9443L11.0557 19.5922L0.783095 20.9443L9.88854 16L0.783095 11.0557L11.0557 12.4078L6.59544 3.05573L14.1115 10.1877L16 0Z" fill="#CBCBCB" />
            </svg>

            <Tag className={`text-white text-2xl syne-semibold ${className}`}>{children}</Tag>
        </div>
    );
}
