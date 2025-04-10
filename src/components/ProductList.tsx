import { IProduct } from "@/types/types";
import React from "react";
import ProductCard from "./ProductCard";
import { Container } from "react-bootstrap";
import styles from "@/styles/page.module.css";

interface IProps {
  products: IProduct[];
}

const ProductList = ({ products }: IProps) => {
  return (
    <Container fluid className={styles.container_center_flex}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;
