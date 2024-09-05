import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const DashboardScreen = () => {
  return (
    <>
      <Container fluid className="pt-3">
        <Row>
          <Col md={4}>
            <Card className="bg-light">
              <Card.Body as={NavLink} to="/admin/products">
                <Card.Title>Products</Card.Title>
                <Card.Text className="text-center display-4">15</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-light">
              <Card.Body as={NavLink} to="/admin/order">
                <Card.Title>Orders</Card.Title>
                <Card.Text className="text-center display-4">10</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-light">
              <Card.Body as={NavLink} to="/admin/users">
                <Card.Title>Users</Card.Title>
                <Card.Text className="text-center display-4">6</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardScreen;
