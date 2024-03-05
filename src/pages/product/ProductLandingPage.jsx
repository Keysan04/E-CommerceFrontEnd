import React, { useEffect, useRef, useState } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { getAProduct } from "../profile/userAction";
import { Link, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  setCartItems,
  setCounter,
  setPayment,
} from "../../system-state/systemSlice";
import Cart from "../cart/Cart";
// import { PURGE } from "redux-persist";
const ProductLandingPage = () => {
  const [priceChange, setPriceChange] = useState(false);
  const [newPrice, setNewPrice] = useState(20);
  const dispatch = useDispatch();
  const qtyRef = useRef("");
  const [showReview, setShowReview] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [cartItem, setCartItem] = useState(false);
  const [makeThumbnail, setMakeThumbnail] = useState(false);
  //   const { product } = useSelector((state) => state.userInfo);
  const { selectedProduct } = useSelector((state) => state.userInfo);
  const { counter } = useSelector((state) => state.systemInfo);

  const { _id } = useParams();

  useEffect(() => {
    _id && dispatch(getAProduct(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    setTotalItems({
      ...totalItems,
    });
    console.log(totalItems);
  }, []);
  const numbers = [];

  for (let i = 1; i <= 20; i++) {
    numbers.push(i);
  }

  const {
    name,
    price,
    salesPrice,
    salesStartDate,
    salesEndDate,
    description,
    thumbnail,
    images,
  } = selectedProduct;

  const handleOnPriceChange = (e) => {
    const { value } = e.target;
    setNewPrice(obj.price * value);

    setPriceChange(true);
  };

  const handleOnSubmit = (e) => {
    debugger;
    e.preventDefault();
    const obj = {
      name,
      price,
      salesPrice,
      description,
      qty: parseInt(qtyRef.current.value),
      thumbnail: "http://localhost:8001" + thumbnail,
    };
    console.log(obj);
    setTotalItems(obj);
    console.log(totalItems);
    dispatch(setCounter(counter + 1));

    // dispatch({ type: PURGE, key: "root", result: () => null });
    // console.log(counter);\
    // setTotalItems([...totalItems, obj]);
    dispatch(setCartItems(obj));
    setCartItem(true);
  };

  console.log(totalItems);
  // const handleOnCheckout = () => {
  //   alert("Are you ready for Checkout?");
  //   dispatch(setPayment());
  // };
  return (
    <ClientLayout counter={setCounter}>
      <Container>
        <Row className="mt-4">
          <Col md={5}>
            <div>
              <div>
                <img
                  src={`http://localhost:8001/${thumbnail}`}
                  width="100%"
                  className="shadow-lg img-thumbnail"
                />
              </div>
              <div
                className="d-flex mt-4 pt-2 gap-2"
                style={{ height: "170px", width: "170px" }}
              >
                <Link></Link>
                <img
                  src={`http://localhost:8001/${images[1]}`}
                  width="100%"
                  className="shadow-lg img-thumbnail"
                  onClick={() => setMakeThumbnail(true)}
                />
                <img
                  src={`http://localhost:8001/${images[3]}`}
                  width="100%"
                  className="shadow-lg img-thumbnail"
                />
                <img
                  src={`http://localhost:8001/${images[2]}`}
                  width="100%"
                  className="shadow-lg img-thumbnail"
                />
              </div>
            </div>
          </Col>

          <Col md={7}>
            <h1>{name}</h1>
            <p className="text-danger">
              {/* {salesStartDate.slice(0, 10)}- {salesEndDate.slice(0, 10)} */}
            </p>
            <p className="mb-5">
              <span>
                <FaStar className="text-warning" />
                <FaStar className="text-warning" />
                <FaStar className="text-warning" />
                <FaStar className="text-warning" />
                <FaStarHalf className="text-warning" />
              </span>
              <small></small>
            </p>
            <p>
              Price: {price}
              <RxCross2 className="text-danger" />
            </p>

            <p>Sales: {salesPrice}</p>

            <p>New Price: {newPrice} </p>

            <p>
              <b>Specifications</b>
              <hr />
              {description?.slice(0, 120)}
            </p>

            {/* {user?._id ? (
                    <Button onClick={() => handleOnBurrow}>Burrow  Ever</Button>
                  ) : (
                    <Link to="/login" className="d-grid">
                      <Button>Login to  Ever</Button>
                    </Link>
                  )} */}

            <Form onSubmit={handleOnSubmit}>
              <Form.Select
                name="quantity"
                ref={qtyRef}
                style={{ width: "82px" }}
                onClick={handleOnPriceChange}
              >
                {numbers.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
              </Form.Select>
              {cartItem === true ? (
                <Alert className="d-flex">
                  Items Added to cart &nbsp;
                  <a href="/cart" variant="info">
                    Go to cart
                  </a>
                  &nbsp;|&nbsp;
                  <a href="/dashboard" className="d-grid" variant="info">
                    Browse More
                  </a>
                </Alert>
              ) : (
                <>
                  <p className="d-grid pt-5">
                    <Button type="submit" className="d-grid" variant="info">
                      Add to cart
                    </Button>
                  </p>
                </>
              )}
            </Form>
          </Col>
        </Row>
        {cartItem !== true && (
          <Row className="mt-5 shadow">
            <Col className="border p-2 rounded">
              <div className="mb-5">
                <Button variant="warning" onClick={() => setShowReview(true)}>
                  Reviews
                </Button>
              </div>

              <div className="d-flex gap-3 shadow mb-4">
                <div className="avatar">KT</div>
                <div className="review">
                  <h4>Best Ever</h4>
                  <p className="mb-3">
                    <span>
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStarHalf className="text-warning" />
                    </span>
                    <small></small>
                  </p>

                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam ex cupiditate asperiores officiis sed ut, dolore hic
                    omnis possimus tenetur quisquam voluptates assumenda, quae,
                    placeat quos laboriosam delectus corporis culpa.
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3 shadow mb-4">
                <div className="avatar">KT</div>
                <div className="review">
                  <h4>Best Ever</h4>
                  <p className="mb-3">
                    <span>
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStarHalf className="text-warning" />
                    </span>
                    <small></small>
                  </p>

                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam ex cupiditate asperiores officiis sed ut, dolore hic
                    omnis possimus tenetur quisquam voluptates assumenda, quae,
                    placeat quos laboriosam delectus corporis culpa.
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3 shadow mb-4">
                <div className="avatar">KT</div>
                <div className="review">
                  <h4>Best Ever</h4>
                  <p className="mb-3">
                    <span>
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStar className="text-warning" />
                      <FaStarHalf className="text-warning" />
                    </span>
                    <small></small>
                  </p>

                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam ex cupiditate asperiores officiis sed ut, dolore hic
                    omnis possimus tenetur quisquam voluptates assumenda, quae,
                    placeat quos laboriosam delectus corporis culpa.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      {/* {cartItem === true && <Cart {...formData} />} */}
    </ClientLayout>
  );
};

export default ProductLandingPage;
