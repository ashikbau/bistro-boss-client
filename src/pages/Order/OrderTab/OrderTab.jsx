

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import './OrderTab.css'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import FoodCard from "../../../components/FoodCard/FoodCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ITEMS_PER_PAGE = 6;

const OrderTab = ({ category }) => {
  const axiosPublic = useAxiosPublic();

  const [pageCount, setPageCount] = useState(0);
  const [pagesData, setPagesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch total count and preload first page
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        setIsLoading(true);
        const res = await axiosPublic.get(`/menu/count?category=${category}`);
        const total = res.data.total || 0;
        const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
        setPageCount(totalPages);
        setPagesData({}); // reset cache
        await fetchPageData(1); // preload first page
      } catch (err) {
        console.error("Error fetching count:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) fetchTotalCount();
  }, [category, axiosPublic]);

  // Fetch and cache specific page
  const fetchPageData = async (page) => {
    if (pagesData[page]) return; // already cached
    try {
      const res = await axiosPublic.get(
        `/menu?page=${page}&limit=${ITEMS_PER_PAGE}&category=${category}`
      );
      const items = res.data.items || [];
      setPagesData((prev) => ({
        ...prev,
        [page]: items,
      }));
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleSlideChange = (swiper) => {
    const nextPage = swiper.activeIndex + 1;
    fetchPageData(nextPage);
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <Swiper
          onSlideChange={handleSlideChange}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} custom-bullet">${index + 1}</span>`,
          }}
          navigation
          modules={[Pagination, Navigation]}
          className="mySwiper custom-swiper"
        >

          {[...Array(pageCount).keys()].map((_, idx) => {
            const page = idx + 1;
            const items = pagesData[page] || [];

            return (
              <SwiperSlide key={page}>
                <div className="grid md:grid-cols-3 gap-10">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <FoodCard key={item._id} item={item} />
                    ))
                  ) : (
                    <p className="col-span-3 text-center text-gray-400">
                      Loading page {page}...
                    </p>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default OrderTab;
