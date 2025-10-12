'use client'

import Image from "next/image";

const Hero = () => {
    return (
        <section>
            <div className="container mx-auto flex justify-between gap-6">
                <div className="w-[65%] bg-amber-600">
                    <h1>I AM A WEB DEVELOPER</h1>
                    <div>A PROJECT MANAGER</div>
                    <div>& UI/UX DESIGNER</div>
                    <p>Leveraging 2 years of user-centered design experience across B2B, B2C, SaaS, and Web3, alongside 6+ years in project management and implementation, I deliver comprehensive digital solutions that propel businesses toward growth.</p>
                </div>
                <div className="w-[35%] bg-blue-300">
                    <Image src="https://cdn.sanity.io/images/0unkcvxg/production/05446432ece585a3b6a764980e0476038d197569-750x1125.webp" alt="Hero Image" width={400} height={400} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
