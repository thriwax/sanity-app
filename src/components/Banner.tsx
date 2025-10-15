const Banner = () => {
    return (
        <section className="container mx-auto flex gap-4 lg:gap-8 justify-between p-0! mb-8">
            <div className="w-[32%] lg:w-[35%] bg-[#95adbe] p-4 shadow-xl rounded-xl overflow-hidden">
                <h2 className="text-xl lg:text-5xl font-bold mb-2">7+</h2>
                <p className="text-[10px] lg:text-sm">Years in development</p>
            </div>
            <div className="w-[32%] lg:w-[27%] bg-[#95adbe] p-4 shadow-xl rounded-xl overflow-hidden">
                <h2 className="text-xl lg:text-5xl font-bold mb-2">35+</h2>
                <p className="text-[10px] lg:text-sm">Realised Projects</p>
            </div>
            <div className="w-[32%] lg:w-[35%] bg-[#95adbe] p-4 shadow-xl rounded-xl overflow-hidden">
                <h2 className="text-xl lg:text-5xl font-bold mb-2">15k+</h2>
                <p className="text-[10px] lg:text-sm">Lines of Code</p>
            </div>
        </section>
    )
}

export default Banner;