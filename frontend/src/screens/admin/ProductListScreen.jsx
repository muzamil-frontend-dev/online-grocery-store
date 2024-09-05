import React, { useState, useEffect } from "react";
import Loader from "../../components/Loading";
import Message from "../../components/Message";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSelector, logoutUser } from "../../features/auth/loginSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ProductListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const { userInfo } = useSelector(loginSelector);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    setLoading(true);
    const { token } = userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    axios
      .get("/api/admin/products", config)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;

        if (error.response && error.response.status === 401) {
          dispatch(logoutUser());
        }
        setError(errorMessage);
        setLoading(false);
      });
  }, []);

  const createProduct = () => {
    setLoading(true);
    const { token } = userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    axios
      .post("/api/admin/products", {}, config)
      .then((res) => {
        const { _id } = res.data;
        setLoading(false);
        navigation(`/admin/products/${_id}`);
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;

        if (error.response && error.response.status === 401) {
          dispatch(logoutUser());
        }
        setError(errorMessage);
        setLoading(false);
      });
  };

  const editProduct = (id) => {
    navigation(`/admin/products/${id}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button className="float-end" onClick={createProduct}>
            Add Product
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading && <Loader />}
          {error && <Message>{error}</Message>}
          <Table variant="striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <Button size="sm" variant="danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="ms-2"
                      onClick={() => editProduct(p._id)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductListScreen;
