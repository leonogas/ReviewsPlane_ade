"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./stylesGrid.css";

// import required modules
import { Grid, Pagination } from "swiper/modules";

export default (data) => {
  const breakpoints = {
    // when window width is >= 1024px (large screens)
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerColumn: 2, // Number of rows for larger screens
    },
    // when window width is >= 640px (medium screens)
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerColumn: 2, // Number of rows for medium screens
    },
    // when window width is <= 639px (small screens)
    639: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerColumn: 1, // Number of rows for small screens
    },
  };

  return (
    <>
      <Swiper
        slidesPerView={3} // Default number of slides for larger screens
        grid={{
          rows: 2, // Default number of rows for larger screens
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper"
        breakpoints={breakpoints} // Apply breakpoints for responsive design
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};
