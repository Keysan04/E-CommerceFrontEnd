import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import ClientLayout from "../../components/layout/ClientLayout";

const stripePromise = loadStripe(
  "pk_test_51OdhK5ClfhguJlgHF5GzQvdkJiM26qDd5KnGjObWBVQqtwal8pUeEKpWdIINgqjHBvfHFVLSGyXCQsVYrbEiZ3t700F9KQFzRd"
);

export const Checkout = () => {
  return (
    <ClientLayout>
      <hr />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </ClientLayout>
  );
};
