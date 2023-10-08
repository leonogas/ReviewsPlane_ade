"use client"

//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = ({ images }) => {

	//These are custom properties for zoom effect while slide-show
	const zoomInProperties = {
		indicators: true,
		scale: 1,
		duration: 5000,
		transitionDuration: 0,
		infinite: true,
		prevArrow: (
			<div style={{ width: "30px", marginRight: "-30px", cursor: "pointer" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill="#2e2e2e"
				>
					<path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
				</svg>
			</div>
		),
		nextArrow: (
			<div style={{ width: "30px", marginLeft: "-30px", cursor: "pointer" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill="#2e2e2e"
				>
					<path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
				</svg>
			</div>
		),
	};
	return (
		<div className="m-10">
			<Zoom {...zoomInProperties}>
				{images.map((each, index) => (
					<div key={index} className="flex justify-center w-full h-full">
						<img
							className="w-3/4 object-cover rounded-lg shadow-xl"
							src={each}
						/>
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slideshow;