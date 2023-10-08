import Share from "@/components/Share";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Link from "next/link";
import {
  FaRegClock,
  FaRegFolder,
  FaRegUserCircle,
} from "react-icons/fa/index.js";
import React from "react";
import { UncontrolledCarousel, Row, Col } from "reactstrap";
import Mambo from "@/components/Mambo";
import Carrousell from "@/components/CarrousellInside";
import CarrousellFdd from "@/components/CarrousellInsideFdd";
import Carrousell2 from "@/components/CarrousellInsideLoop";
import CarrousellTudo from "@/components/CarrousellInsideTudo";
import CarrousellInsideMasonaria from "@/components/CarrousellInsideMasonaria";
import CarrousellInsideOutro from "@/components/CarrousellInsideOutro";
import CarrousellInsideGrid from "@/components/CarrousellInsideGrid";
import CarrousellInsideTudo from "@/components/CarrousellInsideTudo";
import Slideshow2None from "@/components/Slideshow2None";

const { blog_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Post[] = getSinglePage(blog_folder);

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const PostSingle = ({
  params,
}: {
  params: { single: string; slug: string };
}) => {
  const post: Post = getListPage(
    `${blog_folder}/${params.single}/${params.slug}.md`
  );

  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    description,
    image,
    images,
    imageType,
    author,
    categories,
    date,
    tags,
  } = frontmatter;

  let carouselComponent;

  // Conditionally set the carousel component based on imageType
  if (imageType === "simple") {
    carouselComponent = <Carrousell data={images} />;
  } else if (imageType === "advanced") {
    carouselComponent = <CarrousellFdd data={images} />;
  } else if (imageType === "grid") {
    carouselComponent = <CarrousellInsideMasonaria data={images} />;
  } else if (imageType === "loop") {
    carouselComponent = <Slideshow2None data={images} />;
  } else {
    console.log("default");
    // Handle other imageType values or provide a default component
    carouselComponent = <Carrousell data={images} />;
  }
  console.log(imageType);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              {carouselComponent}
              {/*
              <Carrousell data={images} />
              <CarrousellFdd data={images} />
              <CarrousellTudo data={images} />
              <CarrousellInsideMasonaria data={images} />
              <CarrousellInsideOutro data={images} />
              <CarrousellInsideGrid data={images} />



              {/*<Carrousell data={images} />
              <Carrousell2 data={images} />
              image && (
                <div className="mb-10">
                  <ImageFallback
                    src={image}
                    height={500}
                    width={1200}
                    alt={title}
                    className="w-full rounded"
                  />
                </div>
              )}*/}

              <h1
                dangerouslySetInnerHTML={markdownify(title)}
                className="h2 mb-4"
              ></h1>
              <div className="flex justify-center items-center">
                <Link href="/blog">
                  <button className="mt-5 bg-blue-200 hover:bg-white-200 text-black py-2 px-4 rounded mt-4">
                    Show now!
                  </button>
                </Link>
              </div>

              <ul className="mb-4">
                <li className="mr-4 inline-block">
                  <a href={`/authors/${slugify(author)}`}>
                    <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
                    {humanize(author)}
                  </a>
                </li>
                <li className="mr-4 inline-block">
                  <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
                  {categories?.map((category: string, index: number) => (
                    <Link
                      key={category}
                      href={`/categories/${slugify(category)}`}
                    >
                      {humanize(category)}
                      {index !== categories.length - 1 && ", "}
                    </Link>
                  ))}
                </li>
                {date && (
                  <li className="mr-4 inline-block">
                    <FaRegClock className="-mt-1 mr-2 inline-block" />
                    {dateFormat(date)}
                  </li>
                )}
              </ul>
              <div className="content mb-10">
                <MDXContent content={content} />
              </div>
              <div className="row items-start justify-between">
                <div className="mb-10 flex items-center lg:col-5 lg:mb-0">
                  <h5 className="mr-3">Tags :</h5>
                  <ul>
                    {tags?.map((tag: string) => (
                      <li key={tag} className="inline-block">
                        <Link
                          className="m-1 block rounded bg-theme-light px-3 py-1 hover:bg-primary hover:text-white dark:bg-darkmode-theme-light dark:hover:bg-darkmode-primary dark:hover:text-dark"
                          href={`/tags/${slugify(tag)}`}
                        >
                          {humanize(tag)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
