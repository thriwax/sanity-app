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
        <section className="container mx-auto flex flex-col gap-4 text-white p-0! mb-8">
            {/* 1 — теперь тоже анимируется при входе в вьюпорт */}
            <motion.article
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardVariants}
                className="bg-[#443d4b] rounded-xl p-10 shadow-xl flex flex-col lg:flex-row items-center gap-8"
            >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-300 text-5xl syne-regular shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]">
                    1
                </div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#FFF] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">Just Web Agency</span>
                    </div>
                    <h3 className="text-5xl mb-3">Wordpress Developer</h3>
                    <div className="mb-3">
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">WOOCOMMERCE</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">SEO</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">ACF</span>
                    </div>
                    <p className="text-right bg-[#696969] rounded-xl w-fit px-3 py-1 text-[12px]">
                        February 2023 - September 2023
                    </p>
                </div>
            </motion.article>

            {/* 2 — появится при входе в вьюпорт */}
            <motion.article
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardVariants}
                className="bg-[#574f7d] rounded-xl p-10 shadow-xl flex items-center gap-8"
            >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-300 text-5xl syne-regular shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] overflow-hidden pb-[7px]">
                    2
                </div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#FFF] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">WGG Agency</span>
                    </div>
                    <h3 className="text-5xl mb-3">UI/UX Developer</h3>
                    <div className="mb-3">
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">FIGMA</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">WORDPRESS</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">ECOMMERCE</span>
                    </div>
                    <p className="text-right bg-[#404040] rounded-xl w-fit px-3 py-1 text-[12px]">
                        September 2023 - January 2024
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
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-300 text-5xl syne-regular shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] overflow-hidden pb-[7px]">
                    4
                </div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#FFF] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">Digital Strategy</span>
                    </div>
                    <h3 className="text-5xl mb-3">Web Developer</h3>
                    <div className="mb-3">
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">SEO</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">WORDPRESS</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px]">REACT</span>
                    </div>
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
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-300 text-5xl syne-regular shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] overflow-hidden pb-[7px]">
                    5
                </div>
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#000] before:rounded-sm">
                    <div className="syne-bold text-xl">
                        Company: <span className="syne-semibold">QLead</span>
                    </div>
                    <h3 className="text-5xl mb-3">Front-End Developer</h3>
                    <div className="mb-3">
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px] text-white">SEO</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px] text-white">WORDPRESS</span>
                        <span className="bg-gray-500 rounded-md px-3 py-1 mr-3 text-[14px] text-white">UI/UX</span>
                    </div>
                    <p className="text-right bg-[#d0d0d0] rounded-xl w-fit px-3 py-1 text-[12px]">
                        August 2025 - Still Working
                    </p>
                </div>
            </motion.article>
        </section>
    );
};

export default Experience;
