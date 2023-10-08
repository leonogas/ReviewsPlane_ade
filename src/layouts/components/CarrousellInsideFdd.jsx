"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles2.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Image from "next/image";

export default (data) => {
  return (
    <>
      <Swiper
        breakpoints={{
          // When the screen width is less than 640 pixels, show only 1 slide
          640: {
            slidesPerView: 1,
          },
          // When the screen width is between 641 and 768 pixels, show 2 slides
          768: {
            slidesPerView: 2,
          },
          // When the screen width is greater than 768 pixels, show 3 slides
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={10}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.data &&
          data?.data?.map((item, i) => (
            <SwiperSlide key={item}>
              <Image fill={true} src={item} alt="Picture of the author" />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};
