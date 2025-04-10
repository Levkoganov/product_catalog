export const fetchProducts = async () => {
  const response = await fetch("/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
};

export const fetchProductByIdWithReviews = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
};

export const addReview = async (
  productId: string,
  rating: number,
  comment: string
) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, rating, comment }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add review");
  }

  const data = await response.json();
  return data;
};
