"use client";

import React from "react";
import { UncontrolledCarousel, Row, Col } from "reactstrap";

const items = [
  {
    src: "/images/cars/index.jpg",
    altText: "Slide 1",
    caption: "",
    header: "",
    key: "1",
  },
  {
    src: "/images/cars/index.jpg",
    altText: "Slide 2",
    caption: "",
    header: "",
    key: "2",
  },
  {
    src: "/images/cars/index.jpg",
    altText: "Slide 3",
    caption: "",
    header: "",
    key: "3",
  },
];

const Mambo = (data: any) => {
  return (
    <Row>
      <Col md="8" className="mx-auto">
        <UncontrolledCarousel items={items} />
      </Col>
    </Row>
  );
};

export default Mambo;
