'use client';

import { FC } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";

const Experience: FC = () => {
    const prefersReduce = useReducedMotion();

    const cardVariants: Variants = {
        hidden: (i: number) => {
            const fromLeft = i % 2 === 0;
            const xOff = prefersReduce ? 0 : (fromLeft ? "-60vw" : "60vw");
            return { opacity: 0, x: xOff };
        },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.8,
                delay: prefersReduce ? 0 : i * 0.12
            }
        })
    };

    return (
        <section className="container mx-auto flex flex-col gap-4 text-white p-0!">
            {/* 1 — отображается сразу, без анимации */}
            <article className="bg-[#3c2a4d] rounded-xl p-10 shadow-xl flex items-center gap-8">
                <div className="text-8xl syne-regular">1</div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#FFF] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">Just Web Agency</span>
                    </div>
                    <h3 className="text-5xl mb-3">Wordpress Developer</h3>
                    <p className="text-right bg-[#404040] rounded-xl w-fit px-3 py-1 text-[12px]">
                        February 2023 - September 2023
                    </p>
                </div>
            </article>

            {/* 2 — появится при входе в вьюпорт */}
            <motion.article
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardVariants}
                className="bg-[#443d4b] rounded-xl p-10 shadow-xl flex items-center gap-8"
            >
                <div className="text-8xl syne-regular">2</div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#FFF] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">WGG Agency</span>
                    </div>
                    <h3 className="text-5xl mb-3">UI/UX Developer</h3>
                    <p className="text-right bg-[#404040] rounded-xl w-fit px-3 py-1 text-[12px]">
                        September 2023 - January 2024
                    </p>
                </div>
            </motion.article>

            {/* 3 */}
            <motion.article
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardVariants}
                className="bg-[#574f7d] rounded-xl p-10 shadow-xl flex items-center gap-8"
            >
                <div className="text-8xl syne-regular">3</div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#FFF] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company:{" "}
                        <span className="syne-semibold">Rostov Electronics Factory</span>
                    </div>
                    <h3 className="text-5xl mb-3">Linux Embedded Developer</h3>
                    <p className="text-right bg-[#404040] rounded-xl w-fit px-3 py-1 text-[12px]">
                        January 2024 - March 2024
                    </p>
                </div>
            </motion.article>

            {/* 4 */}
            <motion.article
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardVariants}
                className="bg-[#95adbe] rounded-xl p-10 shadow-xl flex items-center gap-8"
            >
                <div className="text-8xl syne-regular">4</div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#FFF] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">Digital Strategy</span>
                    </div>
                    <h3 className="text-5xl mb-3">Web Developer</h3>
                    <p className="text-right bg-[#404040] rounded-xl w-fit px-3 py-1 text-[12px]">
                        June 2024 - August 2025
                    </p>
                </div>
            </motion.article>

            {/* 5 */}
            <motion.article
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardVariants}
                className="bg-[#e0f0ea] text-black rounded-xl p-10 shadow-xl flex items-center gap-8"
            >
                <div className="text-8xl syne-regular">5</div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#000] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">QLead</span>
                    </div>
                    <h3 className="text-5xl mb-3">Front-End Developer</h3>
                    <p className="text-right bg-[#d0d0d0] rounded-xl w-fit px-3 py-1 text-[12px]">
                        August 2025 - Still Working
                    </p>
                </div>
            </motion.article>
        </section>
    );
};

export default Experience;
