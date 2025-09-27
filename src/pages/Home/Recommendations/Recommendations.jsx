import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import RecommendedMenu from "../RecommendedMenu/RecommendedMenu";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Recommendations = () => {
    const [RecommendedItems, setRecommendedItems] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get("/menu") // assuming the file is in the public folder
            .then((response) => {
                const recommendedMenu = response.data.filter(item => item.category === "salad");
                setRecommendedItems(recommendedMenu);
            })
            .catch((error) => {
                console.error("Error fetching menu:", error);
            });
    }, [axiosPublic]);
    return (
        <section className="mb-10">
            <SectionTitle
                heading=" CHEF RECOMMENDS"
                subHeading="Should Try"
            ></SectionTitle>
            <div className=' grid md:grid-cols-3 gap-10'>
                {
                    RecommendedItems.map(item => <RecommendedMenu
                        key={item._id}
                        item={item}

                    ></RecommendedMenu>)
                }
            </div>

        </section>
    );
};

export default Recommendations;