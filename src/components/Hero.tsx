'use client';

import Image from "next/image";
import CustomMarquee from "./UI/Marquee";

const Hero = () => {
    return (
        <section className="">
            <div className="container mx-auto my-8 p-0!">
                <div className="flex justify-between gap-10 items-stretch">
                    {/* Левая колонка */}
                    <div className="w-[65%] flex flex-col gap-10">
                        {/* Карточка — та же высота, что и изображение */}
                        <div className="flex-1 bg-[#404040] p-6 rounded-xl flex flex-col justify-center h-full shadow-xl hover:shadow-2xl transition">
                            <h1 className="roboto text-6xl mb-3 text-white">I AM A WEB DEVELOPER</h1>
                            <div className="roboto text-5xl mb-3 text-gray-200">A PROJECT MANAGER</div>
                            <div className="roboto text-4xl mb-6 text-gray-400">& UI/UX DESIGNER</div>
                            <p className="roboto text-gray-200">
                                Leveraging 2 years of user-centered design experience across B2B, B2C, SaaS, and Web3, alongside 6+ years in project management and implementation, I deliver comprehensive digital solutions that propel businesses toward growth.
                            </p>
                        </div>

                        {/* Бегущая строка — снизу */}
                        <CustomMarquee pauseOnHover />
                    </div>

                    {/* Правая колонка с изображением */}
                    <div className="w-[35%]">
                        <div className="relative h-full max-h-[550px] rounded-xl overflow-hidden">
                            <Image
                                src="https://cdn.sanity.io/images/0unkcvxg/production/05446432ece585a3b6a764980e0476038d197569-750x1125.webp"
                                alt="Hero Image"
                                width={440}
                                height={660}
                                className="object-cover h-full w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
