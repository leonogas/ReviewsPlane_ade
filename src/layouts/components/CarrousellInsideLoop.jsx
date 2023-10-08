"use client";

import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import Image from "next/image";

export default (data) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.details().relativeSlide);
    },
    created() {
      setLoaded(true);
    },
    loop: true, // Enable looping
    perView: 3, // Show 3 slides at once
    spacing: 20, // Adjust spacing between slides as needed
  });

  // Function to automatically slide to the next item
  const autoSlide = () => {
    if (instanceRef.current) {
      const nextSlide = (currentSlide + 1) % instanceRef.current.details().size;
      instanceRef.current.moveToSlideRelative(nextSlide);
    }
  };

  // Start automatic sliding on component mount
  useEffect(() => {
    const interval = setInterval(autoSlide, 3000); // Adjust the interval as needed (e.g., every 3 seconds)

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {data?.data &&
            data?.data?.map((item, i) => (
              <div key={i} className="keen-slider__slide">
                <div className="image-container">
                  <Image fill={true} src={item} alt="Picture of the author" />
                  <div className="image-text">Your Text Here</div>
                </div>
              </div>
            ))}
        </div>
        {loaded && instanceRef.current && (
          <>{/* Arrow components remain the same */}</>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {Array.from({ length: instanceRef.current.size }).map((_, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";

  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996" />
      )}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9" />}
    </svg>
  );
}
