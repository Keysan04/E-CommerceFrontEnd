import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { proceedPayment } from "../../helpers/axiosHelper";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const cart = {
  amount: 25,
  productName: "pen",
};

export const CheckoutForm = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { payment } = useSelector((state) => state.systemInfo);
  const strip = useStripe();
  const element = useElements();

  const [form, setForm] = useState({});
  useEffect(() => {
    setForm(user);
  }, [form]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    debugger;

    e.preventDefault();

    //check if strip is loaded properly
    if (!strip || !element) {
      return alert("not ready to process the payment");
    }

    //get client_secret from our server
    const obj = {
      amount: payment,
      currency: "aud",
      paymentMethodType: "card",
    };
    const data = await proceedPayment(obj);

    //data.clientSecret

    //use strip sdk to actually process the apyment

    const pending = strip.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: element.getElement(CardElement),
        billing_details: {
          name: form.name,
          email: form.email,
        },
      },
    });
    toast.promise(pending, {
      pending: "Hold tight please...",
    });
    const { paymentIntent } = await pending;

    console.log(paymentIntent);

    // if payment is success, send the order details to api to store in new order data
    if (paymentIntent.status === "succeeded") {
      // call order api and send cart, user, payment details to store in your order table
      toast.success("Payment done successfully");
    }
    // If unsuccessful Payment, show error
    else toast.error("Unable to process the order try again later");
  };

  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="form-center
        m-auto
        border
        rounded
        shadow-lg
        p-3
        mt-5"
      >
        <Form.Group>
          <Form.Label>First Name: </Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="text"
            name="name"
            value={user.fName + " " + user.lName}
            placeholder="Your name"
          />

          <Form.Label>Email: </Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="email"
            name="email"
            value={user.email}
            placeholder="Your @email.com"
          />

          <Form.Label className="mt-3" style={{ color: "red" }}>
            <strong>Total = {payment}</strong>
          </Form.Label>

          {/* credit card input form */}
          <div className="m-auto p-3 mt-5">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
          <Button type="submit" className="mt-3">
            submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
