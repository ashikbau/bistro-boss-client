import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import RecommendedMenu from "../RecommendedMenu/RecommendedMenu";


const Recommendations = () => {
    const [RecommendedItems,setRecommendedItems] = useState([]);
    useEffect(()=>{
        fetch("menu.json")
        .then(res=>res.json())
        .then(data=>{
            const RecommendedMenu = data.filter(item=>item.category === "salad")
            setRecommendedItems(RecommendedMenu)
        })
    },[])
    return (
        <section className="mb-10">
             <SectionTitle
            heading = " CHEF RECOMMENDS"
            subHeading = "Should Try"
            ></SectionTitle>
            <div className=' grid md:grid-cols-3 gap-10'>
                {
                  RecommendedItems.map(item=><RecommendedMenu
                    key = {item._id}
                    item={item}
                  
                  ></RecommendedMenu>)  
                }
            </div>
       
        </section>
    );
};

export default Recommendations;