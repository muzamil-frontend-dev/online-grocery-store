import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loading";
import { getOrderDetail } from "../features/order/orderDetailSlice";
import { orderDetailSelector } from "../features/order/orderDetailSlice";
import { loginSelector } from "../features/auth/loginSlice";
import { orderPaySelector, resetOrder } from "../features/order/orderPaySlice";
import StripeContainer from "../components/StripeContainer";
const OrderScreen = () => {
  const { id } = useParams();

  const { userInfo } = useSelector(loginSelector);

  const { loading, order, error } = useSelector(orderDetailSelector);

  const { success } = useSelector(orderPaySelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || (order && id !== order._id) || success) {
      dispatch(getOrderDetail(id));
      if (success) {
        //Reset Order Pay
        dispatch(resetOrder());
      }
    }
  }, [userInfo, dispatch, id, success, order, navigate]);

  return (
    <div className="pt-3">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        order && (
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Order # <small>{order._id}</small>{" "}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>User </h4>
                  <strong>Name :</strong> {order.user.name}
                  <br />
                  <strong>Email :</strong>{" "}
                  <a href={`mailto:${order.user.email}`}>
                    {" "}
                    {order.user.email}{" "}
                  </a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.zipCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  <strong>Method :</strong> {order.paymentType.toUpperCase()}
                  <br />
                  {order.isPaid ? (
                    <Message variant="success">
                      Order is paid at {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Order is not paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Delivery Status</h4>{" "}
                  {order.isDelivered ? (
                    <Message variant="success">
                      Order is delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Order is not delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3>Order Items</h3>
                  {order.orderItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((cartItem, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={cartItem.image} fluid />
                            </Col>
                            <Col>
                              <Link to={`/product/${cartItem.product}`}>
                                {cartItem.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {cartItem.qty} x {cartItem.price} = Rs{" "}
                              {(cartItem.qty * cartItem.price).toFixed(2)}/-
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>Rs {order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>Rs {order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>Rs {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>Rs {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <StripeContainer />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      )}
    </div>
  );
};

export default OrderScreen;
