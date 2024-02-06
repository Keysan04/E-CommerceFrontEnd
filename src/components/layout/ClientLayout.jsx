import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "react-bootstrap";

const ClientLayout = ({ children, title }) => {
  return (
    <div>
      <div className="client-layout">
        <Header />

        <div className="page-content">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default ClientLayout;
