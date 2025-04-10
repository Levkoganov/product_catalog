"use client";

import styles from "@/styles/page.module.css";
import { fetchProducts } from "@/utils/apiClient";
import ProductList from "@/components/ProductList";
import { useFetchData } from "@/hooks/useFetchData";
import { IProduct } from "@/types/types";
import { Container } from "react-bootstrap";

const Home = () => {
  const { data: products, loading, error } = useFetchData<IProduct[]>(fetchProducts);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container fluid className="p-0">
      <h1 className={styles.header_title}>Product Catalog</h1>
      <ProductList products={products || []} />
    </Container>
  );
};

export default Home;
