import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";

import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    const categories = [
        { image: slide1, label: "Salads" },
        { image: slide2, label: "Pizza" },
        { image: slide3, label: "Soups" },
        { image: slide4, label: "Cake" },
        { image: slide5, label: "Salads Eco" },
    ];

    return (
        <div>
            <SectionTitle
                subHeading="From 11:00am to 10:00pm"
                heading="ORDER ONLINE"
            />

            <div className="w-full max-w-[1280px] mx-auto px-4">
                <Swiper
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper mb-20"
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative">
                                <img
                                    src={category.image}
                                    alt={category.label}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase text-white text-center drop-shadow-md px-2">
                                        {category.label}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Category;
