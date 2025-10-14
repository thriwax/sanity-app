const Banner = () => {
    return (
        <section className="container mx-auto flex gap-8 justify-between p-0! mb-8">
            <div className="w-[35%] bg-gray-800 p-4 shadow-xl rounded-xl overflow-hidden">
                <h2 className="text-5xl font-bold mb-2">8+</h2>
                <p className="text-sm">Years in development</p>
            </div>
            <div className="w-[27%] bg-gray-800 p-4 shadow-xl rounded-xl overflow-hidden">
                <h2 className="text-5xl font-bold mb-2">35+</h2>
                <p className="text-sm">Realised Projects</p>
            </div>
            <div className="w-[35%] bg-gray-800 p-4 shadow-xl rounded-xl overflow-hidden">
                <h2 className="text-5xl font-bold mb-2">15k+</h2>
                <p className="text-sm">Lines of Code</p>
            </div>
        </section>
    )
}

export default Banner;