"use client";

import React from "react";

export default function ProductNone(props) {
  return (
    <div className="card">
      <img className="product--image" src={props.url} alt="product image" />
    </div>
  );
}
