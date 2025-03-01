"use client";
import React from "react";
import HeaderSection from "./HeaderSection";
import ProductGrid from "./ProductGrid";

const CategoryProductList = ({
  products,
  productName,
}: {
  products: any[];
  productName: string;
}) => {
  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div style={{ padding: "10px" }}>
      <HeaderSection title={productName || "All Products"} />
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryProductList;
