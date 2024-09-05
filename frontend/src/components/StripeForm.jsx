import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Message from "./Message";
import Loader from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { orderPaySelector, payOrder } from "../features/order/orderPaySlice";
import { useParams } from "react-router-dom";
const StripeForm = () => {
  const [stripeError, setStripeError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const { loading, error, success } = useSelector(orderPaySelector);
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStripeError(null);
    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setStripeError(error.message);
      return;
    }

    const {
      id,
      card: { brand, last4 },
    } = paymentMethod;
    dispatch(
      payOrder(orderId, {
        id,
        brand,
        last4,
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      {stripeError && <Message>{stripeError}</Message>}
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <Form.Group controlId="cardNumber" className="mb-2">
        <Form.Label>Card Number</Form.Label>
        <CardNumberElement className="form-control" />
      </Form.Group>
      <Form.Group controlId="cardExpiry" className="mb-2">
        <Form.Label>Card Expiry</Form.Label>
        <CardExpiryElement className="form-control" />
      </Form.Group>
      <Form.Group controlId="cardCvc" className="mb-2">
        <Form.Label>Card CVC</Form.Label>
        <CardCvcElement className="form-control" />
      </Form.Group>
      <div className="d-grid my-3">
        <Button type="submit">Pay</Button>
      </div>
    </Form>
  );
};
export default StripeForm;
