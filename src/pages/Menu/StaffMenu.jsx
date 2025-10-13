
import menuImg from "../../assets/menu/menu-bg.png"
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg"

import MenuCategory from './MenuCategory/MenuCategory';
import useMenu from '../../hooks/useMenu';
import Cover from "../Shared/Cover/Cover";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const StaffMenu = () => {
    const [menu] = useMenu();

    // Filter menu items by category
    const offered = menu.filter(item => item.category === "offered");
    const desserts = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");


    return (
        <div>
            {/* Main Cover */}
            <Cover img={menuImg} title="Staff Menu" />

            {/* Today's Offer */}
            <SectionTitle subHeading="Today's Offer" heading="Don't Miss" />
            <MenuCategory items={offered} cartType="staff" />

            {/* Category Sections */}
            <MenuCategory items={desserts} title="Dessert" img={dessertImg} cartType="staff" />
            <MenuCategory items={soup} title="Soup" img={soupImg} cartType="staff" />
            <MenuCategory items={salad} title="Salad" img={saladImg} cartType="staff" />
            <MenuCategory items={pizza} title="Pizza" img={pizzaImg} cartType="staff" />
        </div>
    );
};

export default StaffMenu;
