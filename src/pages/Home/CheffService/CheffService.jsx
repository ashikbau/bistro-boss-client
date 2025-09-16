import bannerImg from "../../../assets/home/chef-service.jpg"

const CheffService = () => {
    return (
        <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${bannerImg})` }}
        >
            <div className="bg-white bg-opacity-90 shadow-xl rounded-md p-8 max-w-2xl text-center">
                <h2 className="text-3xl font-semibold mb-4">Bistro Boss</h2>
                <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus, libero accusamus laborum deserunt ratione
                    dolor officiis praesentium! Deserunt magni aperiam dolor
                    eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.
                </p>
            </div>
        </div>
    );
};

export default CheffService;