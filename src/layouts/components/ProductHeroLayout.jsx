import Link from "next/link";
import * as React from "react";

function ProductHeroLayout(props) {
  const { welcomeText, subtitleText, sloganText } = props;

  return (
    <div className="relative w-full">
      {/* Image */}
      <img
        src="/images/home.jpg" // Replace with your image path
        alt="Banner Image"
        className="w-full mx-auto object-cover"
        style={{ height: "80vh" }} // Set the height to 80% of the viewport height
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-start text-white text-center">
        {/* Welcome Text */}
        <h1 className="text-7xl text-white font-bold pt-10 mt-20">
          {welcomeText}
        </h1>

        {/* Subtitle */}
        <h2 className="text-5xl text-white font-semibold pt-20">
          {subtitleText}
        </h2>

        {/* Slogan */}
        <p className="text-4xl text-white font-normal mt-10">{sloganText}</p>

        {/* Button */}
        <Link href="/blog">
          <button className="mt-5 bg-white hover:bg-white-200 text-black py-2 px-4 rounded mt-4">
            Start Here
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductHeroLayout;
