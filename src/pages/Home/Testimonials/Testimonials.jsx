import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { FaQuoteLeft } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";



const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/reviews")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, [axiosPublic]);

    return (
        <section className="my-20">
            <SectionTitle
                subHeading="---What Our Clients Say---"
                heading="TESTIMONIALS"

            ></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >

                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />


                            <FaQuoteLeft className=" text-4xl font-extrabold my-10" />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                        </SwiperSlide>)

                }

            </Swiper>

        </section>
    );
};

export default Testimonials;