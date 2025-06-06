import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import Rating from "./Rating";

const ProductCard = ({ product }) => {
  console.log("product: ", product);
  return (
    <Card
      className="p-2 my-2 product-card"
      as={NavLink}
      to={`/products/${product._id}`}
    >
      <Card.Img
        variant="top"
        src={product.image}
        style={{ maxHeight: "150px" }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text as="h4">Rs. {product.price}/-</Card.Text>
        {/* <Card.Text as="div">
          <Rating
            rating={product.rating}
            text={` from ${product.numReviews} users`}
          />
        </Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
