import React, { useEffect, useState } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
// import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomCard from "../../components/custom-card/CustomCard";
import { useSelector } from "react-redux";
import { CustomCarousel } from "../../components/carousel/CustomCarousel";
import { getItemByCategory } from "../../helpers/axiosHelper";
// import img1 from "http://localhost:8001/1706934412385-Egg.jpg";
const Dashboard = () => {
  //   const dispatch = useDispatch();
  const { category } = useSelector((state) => state.userInfo);
  const [selectedCatProducts, setSelectedCatProducts] = useState([]);
  const { product } = useSelector((state) => state.userInfo);
  const [filteredItem, setFilteredItem] = useState([]);
  const [showSelectedProduct, setShowSelectedProduct] = useState(false);

  useEffect(() => {
    setFilteredItem(product);
  }, [product]);

  const handleOnCategorySelect = async (id) => {
    const { data } = await getItemByCategory(id);
    setSelectedCatProducts(data);
    console.log(selectedCatProducts);
    setShowSelectedProduct(true);
  };

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const str = value.toLowerCase();
    const searchedItem = product.filter((item) =>
      item.name.toLowerCase().includes(str)
    );
    setFilteredItem(searchedItem);
  };

  const showAllCat = () => {
    setShowSelectedProduct(false);
  };

  return (
    <ClientLayout>
      <Navbar className="nav-menu">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="" onClick={() => showAllCat()}>
              All
            </Nav.Link>
            {category?.map((item, i) => (
              <Nav.Link
                href=""
                key={item._id}
                onClick={() => handleOnCategorySelect(item._id)}
              >
                {item.title}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>

      {showSelectedProduct === true ? (
        <div className="d-flex gap-2 mt-3 flex-wrap ">
          {selectedCatProducts.map((item, i) => (
            <Link to={`/product/${item._id}`} key={i}>
              <CustomCard {...item} />
            </Link>
          ))}
        </div>
      ) : (
        <>
          <div>
            <CustomCarousel />
          </div>

          <div className="d-grid mt-3">
            <Row>
              <Col md={4}>
                <Form.Control
                  placeholder="Search products by name.."
                  onChange={handleOnSearch}
                />
              </Col>
              <Col md={2}>
                {filteredItem?.length && (
                  <div>{filteredItem.length} products found</div>
                )}
              </Col>
            </Row>
          </div>
          <Row>
            <Col
              xs={1}
              md={2}
              lg={10}
              className="d-flex justify-content-center flex-wrap mt-5 gap-3 g-4"
            >
              {filteredItem.map((item, i) => (
                <Link to={`/product/${item.slug}`} key={i}>
                  <CustomCard {...item} />
                </Link>
              ))}
            </Col>
          </Row>
        </>
      )}

      <hr />
      <hr />
      <hr />
    </ClientLayout>
  );
};

export default Dashboard;
