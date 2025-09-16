
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import CheffService from "../CheffService/CheffService";
import Contact from "../Contact/Contact";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommendations from "../Recommendations/Recommendations";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss |Home</title>

            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <CheffService></CheffService>
            <PopularMenu></PopularMenu>
            <Contact></Contact>
            <Recommendations></Recommendations>
            <Featured></Featured>
            <Testimonials></Testimonials>



        </div>
    );
};

export default Home;