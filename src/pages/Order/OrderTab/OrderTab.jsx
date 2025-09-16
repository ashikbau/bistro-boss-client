// import FoodCard from "../../../components/FoodCard/FoodCard";

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// // import required modules
// import { Pagination } from 'swiper/modules';


// const OrderTab = ({items}) => {
//     const pagination = {
//     clickable: true,
//     renderBullet: function (index, className) {
//       return '<span class="' + className + '">' + (index + 1) + '</span>';
//     },
//   };
//     return (
//         // <div className='grid md:grid-cols-3 gap-10'>
//         //     {items.map(item => <FoodCard
//         //         key={item._id}
//         //         item={item}
//         //     ></FoodCard>)}
//         // </div>
//         <Swiper
//         pagination={pagination}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//             <div className='grid md:grid-cols-3 gap-10'>
//                 {
//               items.map(item=><FoodCard
//               key={item._id}
//               item={item}
              
//               ></FoodCard>)  
//             }
//             </div>
//         </SwiperSlide>
       
//       </Swiper>
//     );
// };

// // export default OrderTab;
// import FoodCard from "../../../components/FoodCard/FoodCard";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation'; // 👈 Add navigation styles
// import { Pagination, Navigation, Autoplay } from 'swiper/modules'; // 👈 Add modules

// // Utility to chunk items into pages
// const chunkArray = (arr, chunkSize) => {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += chunkSize) {
//     chunks.push(arr.slice(i, i + chunkSize));
//   }
//   return chunks;
// };

// const OrderTab = ({ items }) => {
//   const chunkedItems = chunkArray(items, 6);

//   return (
//     <Swiper
//       pagination={{
//         clickable: true,
//         renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
//       }}
//       navigation={true} // 👈 Enable navigation arrows
//       autoplay={{
//         delay: 5000, // 👈 Change this value for different speed
//         disableOnInteraction: false,
//       }}
//       modules={[Pagination, Navigation, Autoplay]} // 👈 Include modules
//       className="mySwiper"
//     >
//       {chunkedItems.map((group, idx) => (
//         <SwiperSlide key={idx}>
//           <div className="grid md:grid-cols-3 gap-10">
//             {group.map(item => (
//               <FoodCard key={item._id} item={item} />
//             ))}
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default OrderTab;
// import { useState, useEffect } from "react";
// import FoodCard from "../../../components/FoodCard/FoodCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// const ITEMS_PER_PAGE = 6;

// const OrderTab = ({items}) => {
//   const [pageCount, setPageCount] = useState(0);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [swiperInstance, setSwiperInstance] = useState(null);

//   // Fetch total count on mount
//   useEffect(() => {
//     const fetchTotalCount = async () => {
//       const res = await fetch("http://localhost:5000/menu/count");
//       const data = await res.json(); // { total: 42 }
//       setPageCount(Math.ceil(data.total / ITEMS_PER_PAGE));
//     };
//     fetchTotalCount();
//   }, []);

//   // Fetch data for a specific page
//   const fetchPageData = async (page) => {
//     const res = await fetch(`http://localhost:5000/menu?page=${page}&limit=${ITEMS_PER_PAGE}`);
//     const data = await res.json(); // { items: [...] }
//     setCurrentItems(data.items);
//   };

//   // When Swiper is ready or slide changes
//   const handleSlideChange = (swiper) => {
//     const newPage = swiper.activeIndex + 1;
//     fetchPageData(newPage);
//   };

//   return (
//     <div className="space-y-6">
//       <Swiper
//         onSwiper={setSwiperInstance}
//         onSlideChange={handleSlideChange}
//         pagination={{
//           clickable: true,
//           renderBullet: (index, className) =>
//             `<span class="${className}">${index + 1}</span>`,
//         }}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         {/* Only one slide is used to display fetched data */}
//         {[...Array(pageCount).keys()].map((_, idx) => (
//           <SwiperSlide key={idx}>
//             <div className="grid md:grid-cols-3 gap-10">
//               {currentItems.map((item) => (
//                 <FoodCard key={item._id} item={item} />
//               ))}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default OrderTab;
import { useState, useEffect } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";




import "swiper/css";
import "swiper/css/pagination";


const ITEMS_PER_PAGE = 6;


const OrderTab = ({items,category}) => {

  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
//    const {category} = useParams();
 console.log("OrderTab category:", category);


  // ✅ Fetch total count and load first page
  useEffect(() => {
    const fetchTotalCountAndFirstPage = async () => {
      try {
        const res = await fetch(`http://localhost:5000/menu/count?category=${category}`);
        const data = await res.json(); // { total: number }

        const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);
        setPageCount(totalPages);

        // ✅ Load first page initially
        fetchPageData(1);
      } catch (err) {
        console.error("Error fetching total count:", err);
      }
    };

    fetchTotalCountAndFirstPage();
  }, [category]);

  // ✅ Fetch items for the given page
  const fetchPageData = async (page) => {
    try {
      const res = await fetch(
         `http://localhost:5000/menu?page=${page}&limit=${ITEMS_PER_PAGE}&category=${category}`
      );
      const data = await res.json();
      setCurrentItems(data.items || []);
    } catch (err) {
      console.error("Error fetching page data:", err);
    }
  };

  // ✅ Handle slide change and load data dynamically
  const handleSlideChange = (swiper) => {
    const newPage = swiper.activeIndex + 1;
    fetchPageData(newPage);
  };

  return (
    <div className="space-y-24 ">
      <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span  class="${className}">${index + 1}</span>`,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {[...Array(pageCount).keys()].map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="grid md:grid-cols-3 gap-10">
              {currentItems.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OrderTab;


