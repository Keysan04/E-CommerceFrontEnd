import React, { useEffect, useState } from "react";
import { CustomCarousel } from "../../components/carousel/CustomCarousel";
import { Row, Col, Container, Form, Alert } from "react-bootstrap";
import ClientLayout from "../../components/layout/ClientLayout";
// import { useSelector } from "react-redux";
// import { CustomCard } from "../../components/custom-card/CustomCard";
// import { Link } from "react-router-dom";

const Home = () => {
  // const [filteredBook, setFilteredBook] = useState([]);
  // const { books } = useSelector((state) => state.bookInfo);

  const handleOnSearch = (e) => {};

  return (
    <ClientLayout>
      <div>
        <Row>
          <Col className="d-grid ">
            <div>
              <Form.Control
                className="d-grid"
                onChange={handleOnSearch}
                placeholder="Search by items name.."
              />
            </div>
            <hr />
          </Col>
        </Row>
        {/* carousel */}
        <CustomCarousel />
      </div>

      <Container className="mt-5" fluid>
        <Row>
          <Col className="d-flex justify-content-center flex-wrap mt-5 gap-3">
            {/* {filteredBook.map(
              (book, i) =>
                // <Link key = {book._id} to = {`/book`}/>
                book.status === "active" && (
                  <Link to={`/book/${book._id}`} key={i}>
                    <CustomCard {...book} />
                  </Link>
                )
            )}
            {filteredBook.length < 1 && (
              <Alert variant="warning">No Book Found</Alert>
            )} */}
          </Col>
        </Row>
      </Container>
    </ClientLayout>
  );
};

export default Home;
