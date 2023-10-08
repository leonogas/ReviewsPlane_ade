"use client";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";

export default (data) => {
  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {data.data.map((image, i) => (
            <img
              key={i}
              src={image}
              style={{ width: "100%", display: "block" }}
              alt=""
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};
