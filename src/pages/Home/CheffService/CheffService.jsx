import bannerImg from "../../../assets/home/chef-service.jpg"

const CheffService = () => {
    return (
        <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${bannerImg})` }}
        >
            <div className="bg-white bg-opacity-90 shadow-xl rounded-md p-8 max-w-2xl text-center">
                <h2 className="text-3xl font-semibold mb-4">Bistro Boss</h2>
                <p className="text-gray-700">
                    Welcome to Bistro Boss, where culinary excellence meets personalized service.
                    Our team of expert chefs is dedicated to transforming your dining experience with
                    bespoke menus, locally-sourced ingredients, and a passion for creating unforgettable
                    dishes that delight your senses. Whether you're hosting a small gathering or a grand celebration,
                    we cater to every occasion with precision and care. Let us elevate your event with flavors that
                    leave a lasting impression.
                </p>
            </div>
        </div>
    );
};

export default CheffService;