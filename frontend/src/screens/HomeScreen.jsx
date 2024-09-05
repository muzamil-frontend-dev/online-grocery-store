import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import ProductCard from "../components/ProductCard";
import {
  fetchProducts,
  productListSelector,
} from "../features/products/productList";

const HomeScreen = () => {
  const { loading, error, products } = useSelector(productListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Row>
      <Col md={12}>
        {loading && <Loading />}
        {error && <Message>{error}</Message>}
      </Col>
      <Col md={12}>
        <Row>
          {products.map((product) => (
            <Col key={product._id} xl={3} lg={4} md={4} sm={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default HomeScreen;
