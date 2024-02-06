import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { HiMinusSm } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPayment } from "../../system-state/systemSlice";
import ClientLayout from "../../components/layout/ClientLayout";

const Cart = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const { cartItems } = useSelector((state) => state.systemInfo);
  console.log(cartItems);
  const { name, price, qty, thumbnail } = cartItems;
  useEffect(() => {
    setCount(qty);
  }, [qty]);
  const inc = (value) => {
    if (value === "P") {
      setCount(count + 1);
    }
    if (value === "M") {
      setCount(count - 1);
    }
  };

  const handleOnCheckout = () => {
    alert("Are you ready for Checkout?");
    dispatch(setPayment(price * count + 5));
  };
  return (
    <ClientLayout>
      <Row>
        <Col md={8} className="m-auto shadow-lg p-3 mt-5 text-center">
          <h2>Prouduct Details</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Pic</th>
                <th>Product Details</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {
                    <img
                      width="100px"
                      src={thumbnail}
                      className="shadow-lg img-thumbnail"
                    />
                  }
                </td>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                  <Button variant="info" onClick={() => inc("M")}>
                    <HiMinusSm />
                  </Button>
                  {""}
                  {""} <span className="qty">{count}</span>
                  {""}
                  <Button variant="info" onClick={() => inc("P")}>
                    <HiMiniPlusSmall />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={4} className="m-auto border rounded shadow-lg p-3 mt-5">
          <h2>Cart Details</h2>
          <p>
            Prouduct Cost: <b>{price * count}</b>
          </p>
          <p>
            Shipping Cost: <b>$5</b>
          </p>
          <p>
            Total Amount: <b>${price * count + 5} </b>
          </p>
          <Link to="/checkout">
            <Button onClick={() => handleOnCheckout()} variant="info">
              Go to checkout
            </Button>
          </Link>
        </Col>
      </Row>
      <div className="m-auto border rounded shadow-lg p-3 mt-5 text-center g-2 ">
        <p>What we do accepts... </p>
        <img
          width="45px"
          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
          alt="Visa"
        />{" "}
        &nbsp;&nbsp;&nbsp;
        <img
          width="45px"
          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
          alt="American Express"
        />{" "}
        &nbsp;&nbsp;&nbsp;
        <img
          width="45px"
          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
          alt="Mastercard"
        />{" "}
        &nbsp;&nbsp;&nbsp;
        <img
          width="45px"
          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
          alt="PayPal acceptance mark"
        />
      </div>
    </ClientLayout>
  );
};

export default Cart;
