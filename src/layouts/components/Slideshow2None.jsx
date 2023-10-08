"use client";

import "./app.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductNone from "./ProductNone";
import { productData, responsive } from "./data";
import config from "@/config/config.json";
import Link from "next/link";

export default function Slideshow2None(data) {
  const { blog_folder } = config.settings;
  console.log(JSON.stringify(data, null, 2));
  const productNone = data.data.map((item) => <ProductNone url={item} />);
  return (
    <Carousel
      transitionDuration={400}
      autoPlay="true"
      infinite={true}
      autoPlaySpeed={5000}
      responsive={responsive}
    >
      {productNone}
    </Carousel>
  );
}
