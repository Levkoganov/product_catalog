"use client";

import { IProduct } from "@/types/types";
import { fetchProductByIdWithReviews } from "@/utils/apiClient";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import ProductReviews from "./ProductReviews";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";
import { useFetchData } from "@/hooks/useFetchData";
import styles from "@/styles/page.module.css";
import { Col, Container, Row } from "react-bootstrap";

const ProductDetailPage = () => {
  const { id } = useParams() as { id: string };

  const fetchProduct = useCallback(() => fetchProductByIdWithReviews(id), [id]);
  const {
    data: product,
    loading,
    error,
    setData: setProduct,
  } = useFetchData<IProduct>(fetchProduct);

  const handleReviewSubmit = (newReview: any) => {
    if (product)
      setProduct({ ...product, reviews: [...product.reviews, newReview] });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header_title}>{product?.name}</h1>
      <Container fluid className="m-4">
        <Row className={styles.container_center_flex}>
          <Col sm={6}>
            <ProductCard product={product!} showForm={true} />
            <ProductForm
              productId={product?._id || ""}
              onReviewSubmit={handleReviewSubmit}
            />
          </Col>
          <Col sm={6}>
            <ProductReviews reviews={product?.reviews || []} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
