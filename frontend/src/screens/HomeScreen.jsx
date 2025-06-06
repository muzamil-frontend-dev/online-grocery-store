import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingCarousel from "../components/Carousel";
import {
  getPromotions,
  promotionSelector,
} from "../features/promotions/promotionSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getProducts,
  productListSelector,
} from "../features/products/productList";
import ProductCard from "../components/ProductCard";
import { Button, Col, Container, Row } from "react-bootstrap";

const landingCarouselOptions = {
  loop: true,
  center: true,
  items: 1,
  autoplay: true,
  dots: false,
  autoplayTimeout: 3500,
  smartSpeed: 5000,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
};

const Home = () => {
  const { loading, promotions, error } = useSelector(promotionSelector);
  const {
    loading: loadingProducts,
    products,
    error: productsError,
  } = useSelector(productListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotions());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        {loading && loadingProducts && <Loader />}
        {error && productsError && <Message>{error}</Message>}
        {promotions && promotions.length !== 0 && (
          <LandingCarousel data={promotions} options={landingCarouselOptions} />
        )}
        {products && (
          <Col md={12}>
            <Row className="px-2 py-3 align-item-center">
              <Col md={6}>
                <h1 className="">Featured Products</h1>
              </Col>
              <Col className="d-flex justify-content-end my-auto">
                <Button variant="success" className="text-capitalize">
                  view all
                </Button>
              </Col>
            </Row>
            <Row>
              {products.map((product) => (
                <Col key={product._id} xl={3} lg={6} md={4} sm={6}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
