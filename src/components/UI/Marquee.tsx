"use client";

import React from "react";
import Marquee from "react-fast-marquee";

interface MarqueeProps {
    speed?: number;
    pauseOnHover?: boolean;
}

const Dot = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="6"
        viewBox="0 0 8 8"
        className="mx-4 fill-current text-amber-400 inline-block"
    >
        <circle cx="4" cy="4" r="3" />
    </svg>
);

const CustomMarquee: React.FC<MarqueeProps> = ({ pauseOnHover = true }) => {
    const items = [
        "Business Growth",
        "Web Development",
        "Project Management",
        "UI/UX Design",
        "Agile Methodologies",
        "Team Leadership",
        "Product Strategy",
        "User-Centered Design",
        "Digital Solutions",
    ];

    return (
        <div className="w-full overflow-hidden bg-neutral-900 text-white py-3 rounded-xl">
            <Marquee
                speed={50}
                pauseOnHover={pauseOnHover}
                className="text-xl font-light rounded-xl"
            >
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        <span className="mx-2">{item}</span>
                        {/* точка только между пунктами */}
                        {i < items.length - 1 && <Dot />}
                    </React.Fragment>
                ))}
            </Marquee>
        </div>
    );
};

export default CustomMarquee;
