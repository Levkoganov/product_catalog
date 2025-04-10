import React, { useState } from "react";
import { addReview } from "@/utils/apiClient";
import { IReviews } from "@/types/types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

interface IProps {
  productId: string;
  onReviewSubmit: (newReview: IReviews) => void;
}

const ProductForm = ({ productId, onReviewSubmit }: IProps) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newReview = await addReview(productId, rating, comment);
      onReviewSubmit(newReview);
      setComment("");
      setRating(1);
      handleClose();
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="mb-3">
      <Button variant="primary" onClick={handleShow}>
        Submit a Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductForm;
