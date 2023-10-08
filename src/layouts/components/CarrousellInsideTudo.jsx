"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// Import required modules
import { Grid, Pagination } from "swiper/modules";
import "./styles3.css";
import Image from "next/image";

export default (data) => {
  const dataLength = data?.data?.length || 0;

  // Calculate the number of rows dynamically to ensure a maximum of 3 images per row
  const rows = Math.ceil(dataLength / 3);

  const breakpoints = {
    // when window width is >= 1024px (large screens)
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    // when window width is >= 640px (medium screens)
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    // when window width is <= 639px (small screens)
    639: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };

  return (
    <Swiper
      slidesPerView={3} // Default number of slides for larger screens
      grid={{
        rows: 5, // Dynamically set the number of rows
      }}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Grid, Pagination]}
      className="mySwiper"
      breakpoints={breakpoints} // Apply breakpoints for responsive design
    >
      {data?.data &&
        data?.data?.map((item, i) => (
          <SwiperSlide key={item}>
            <Image fill={true} src={item} alt="Picture of the author" />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
