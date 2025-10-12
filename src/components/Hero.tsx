'use client';

import Image from "next/image";
import Link from "next/link";
import CustomMarquee from "./UI/Marquee";
import LogoSvg from "./UI/LogoSvg";

const Hero = () => {

    return (
        <section className="">
            <div className="container mx-auto my-8 p-0!">
                <div className="flex justify-between gap-10 items-stretch">
                    <div className="w-[65%] flex flex-col gap-10">
                        <div className="flex-1 bg-[#404040] px-6 pb-8 rounded-xl flex flex-col justify-end h-full shadow-xl hover:shadow-2xl transition">
                            <div className="flex justify-between">
                                <div>
                                    <LogoSvg />
                                    <h1 className="roboto text-5xl mb-2 text-white">I AM WEB DEVELOPER</h1>
                                    <div className="roboto text-3xl mb-6 text-gray-400">& UI/UX DESIGNER</div>
                                </div>
                            </div>
                            <p className="roboto text-gray-200">
                                Leveraging 2 years of user-centered design experience across B2B, B2C, SaaS, and Web3, alongside 6+ years in project management and implementation, I deliver comprehensive digital solutions that propel businesses toward growth.
                            </p>
                            <div className="flex items-center justify-between mt-6">
                                <Link href="https://www.linkedin.com/in/fedor-tatarintsev/" className="w-fit bg-[#788E86] rounded-xl p-2 font-extrabold shadow-xl">HIRE ME</Link>
                                <Link
                                    href="https://github.com/thriwax"
                                    aria-label="Github"
                                    className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                >
                                    <svg
                                        className="w-5 h-5 shadow-xl"
                                        viewBox="0 0 24 24"
                                        fill="#A7BEB4"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <CustomMarquee pauseOnHover />
                    </div>
                    <div className="w-[35%]">
                        <div className="relative h-full max-h-[550px] rounded-xl overflow-hidden bg-silver">
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

