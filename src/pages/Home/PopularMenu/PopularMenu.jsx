
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item=>item.category === "popular")
    
    return (
        <section className='mb-12'>
            <SectionTitle
            heading = " From Our Menu"
            subHeading = "Popular Items"
            ></SectionTitle>
            <div className=' grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item=> <MenuItem
                    key = {item._id}
                    item={item}
                    
                    ></MenuItem>)
                }
            </div>

                    <div className='flex justify-center mt-20 '>
                        <button className='  border-4 border-x-0 border-t-0 border-b-4 border-black rounded-md '>View Full Menu</button>
                    </div>

            
        </section>
    );
};

export default PopularMenu;