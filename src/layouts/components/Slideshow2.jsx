"use client";

import "./app.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { productData, responsive } from "./data";
import config from "@/config/config.json";
import Link from "next/link";

export default function Slideshow2(data) {
  const { blog_folder } = config.settings;
  console.log(JSON.stringify(data, null, 2));
  const product = data.data.map((item) => (
    <Link key={`${item.path}`} href={`${item.path}`}>
      <Product
        name={item.frontmatter.title}
        url={item.frontmatter.image}
        price={item.frontmatter.price}
        description={item.frontmatter.description}
      />
    </Link>
  ));
  return (
    <Carousel
      transitionDuration={400}
      autoPlay="true"
      infinite={true}
      autoPlaySpeed={5000}
      responsive={responsive}
    >
      {product}
    </Carousel>
  );
}
