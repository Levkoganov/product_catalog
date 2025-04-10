import { IReviews } from "@/types/types";
import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

interface IProps {
  reviews: IReviews[];
}

const ProductReviews = ({ reviews }: IProps) => {
  if (reviews.length === 0) {
    return <h1>No reviews yet. Be the first to leave a review!</h1>;
  }

  return (
    <ListGroup as="ol" style={{ overflowWrap: "anywhere" }}>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        variant="success"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Reviews</div>
        </div>
      </ListGroup.Item>

      {reviews.map((review) => (
        <ListGroup.Item
          key={review._id}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">{review.comment}</div>
          <Badge bg="success">Rating: {review.rating}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ProductReviews;
