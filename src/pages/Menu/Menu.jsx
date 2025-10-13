// import { Helmet } from 'react-helmet-async';
// import Cover from '../Shared/Cover/Cover';
// import menuImg from "../../assets/menu/dessert-bg.jpeg"
// import pizzaImg from "../../assets/menu/pizza-bg.jpg"
// import soupImg from "../../assets/menu/soup-bg.jpg"
// import saladImg from "../../assets/menu/salad-bg.jpg"
// import useMenu from '../../hooks/useMenu';
// import SectionTitle from '../../components/SectionTitle/SectionTitle';
// import MenuCategory from './MenuCategory/MenuCategory';


// const Menu = () => {
//     const [menu] = useMenu();
//     const desserts = menu.filter(item=>item.category === "dessert")
//     const soup = menu.filter(item=>item.category === "soup")
//     const salad = menu.filter(item=>item.category === "salad")
//     const pizza = menu.filter(item=>item.category === "pizza")
//     const offered = menu.filter(item=>item.category === "offered")

//     return (
//         <div>
//             <Helmet>
//                 <title>Bistro Boss |Menu</title>

//             </Helmet>
//             <Cover img = {menuImg} title="Our Menu"></Cover>
//             {/* main cover */}
//             <SectionTitle subHeading= "Don't Miss" heading="Today's Offer"></SectionTitle>
//              {/* Offered */}
//             <MenuCategory items = {offered}></MenuCategory>
//             {/* desserts menu items */}
//             <MenuCategory
//             items={desserts}
//             title= "Dessert"
//             img={menuImg}

//             ></MenuCategory>
//             {/* Soup menu items */}
//             <MenuCategory
//             items={soup}
//             title= "Soup"
//             img={soupImg}

//             ></MenuCategory>
//             {/* Salad menu items */}
//             <MenuCategory
//             items={salad}
//             title= "Salad"
//             img={saladImg}

//             ></MenuCategory>
//             {/* pizza menu items */}
//             <MenuCategory
//             items={pizza}
//             title= "Pizza"
//             img={pizzaImg}

//             ></MenuCategory>


//         </div>
//     );
// };

// export default Menu;

import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import menuImg from "../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../assets/menu/pizza-bg.jpg"
import soupImg from "../../assets/menu/soup-bg.jpg"
import saladImg from "../../assets/menu/salad-bg.jpg"
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';

const Menu = ({ cartType = "user" }) => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const offered = menu.filter(item => item.category === "offered");

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover img={menuImg} title="Our Menu" />

            <SectionTitle subHeading="Don't Miss" heading="Today's Offer" />
            <MenuCategory items={offered} cartType={cartType} />

            <MenuCategory items={desserts} title="Dessert" img={menuImg} cartType={cartType} />
            <MenuCategory items={soup} title="Soup" img={soupImg} cartType={cartType} />
            <MenuCategory items={salad} title="Salad" img={saladImg} cartType={cartType} />
            <MenuCategory items={pizza} title="Pizza" img={pizzaImg} cartType={cartType} />
        </div>
    );
};

export default Menu;
