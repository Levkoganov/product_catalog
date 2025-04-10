import React from "react";
import { IProduct } from "@/types/types";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface IProps {
  product: IProduct;
  showForm?: boolean;
}

const ProductCard = ({ product, showForm }: IProps) => {
  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Card border="dark" style={{ minWidth: "90%" }} className="mb-3">
      <Card.Header>{product.name}</Card.Header>
      <Card.Body>
        <Card.Title>{product.description}</Card.Title>
        <Card.Title>Price: ${product.price}</Card.Title>
        {!showForm && (
          <Button variant="primary" onClick={() => handleOnClick(product._id)}>
            View Details
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
