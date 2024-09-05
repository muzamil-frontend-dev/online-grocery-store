import React, { useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loading";
import Message from "../components/Message";
import { Image, ListGroup, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  addCartItem,
  removeCartItem,
  cartSelector,
} from "../features/cart/cartSlice";

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const qty = params.get("qty") ? params.get("qty") : 1;

  const { loading, error, cartItems } = useSelector(cartSelector);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (id && qty <= 5) {
      // Add to cart
      dispatch(addCartItem(id, qty));
    }
  }, [id, qty, dispatch]);

  const updateCartItem = (id, qty) => {
    dispatch(addCartItem(id, qty));
  };

  const removeItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : cartItems.length > 0 ? (
            <Row>
              <Col md={8}>
                {cartItems.map((item) => (
                  <Row key={item.product}>
                    <Col md={2}>
                      <Image src={item.image} fluid />
                    </Col>
                    <Col md={3}>
                      <Link className="fs-4" to={`/products/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Select
                          disabled={item.countInStock === 0}
                          onChange={(e) =>
                            updateCartItem(item.product, e.target.value)
                          }
                          value={item.qty}
                        >
                          {[...Array(item.countInStock).keys()].map(
                            (value) =>
                              value < 5 && (
                                <option key={value} value={value + 1}>
                                  {value + 1}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <span className="px-3">X</span>
                      {item.price}
                    </Col>
                    <Col md={2} className="fw-bold">
                      Rs. {item.price * item.qty}/-
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeItem(item.product)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>SubItems</h4>
                      </Col>
                      <Col>
                        <h4>
                          {cartItems.reduce((pre, cur) => {
                            return (pre += cur.qty);
                          }, 0)}
                        </h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>Total Prcie</h4>
                      </Col>
                      <Col>
                        <h4>
                          Rs{" "}
                          {cartItems.reduce((pre, cur) => {
                            return (pre += cur.qty * cur.price);
                          }, 0)}{" "}
                          /-
                        </h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid text-uppercase">
                      <Button onClick={handleCheckout}>
                        Proceed to checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>Please add cart items</Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
