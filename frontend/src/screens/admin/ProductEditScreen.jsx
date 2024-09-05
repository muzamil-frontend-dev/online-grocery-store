import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginSelector, logoutUser } from "../../features/auth/loginSlice";
import FormContainer from "../../components/FormContainer";
import axios from "axios";
import Loader from "../../components/Loading";
import Message from "../../components/Message";

const ProductEditScreen = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [fabric, setFabric] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { userInfo } = useSelector(loginSelector);
  const navigation = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = (id) => {
    setLoading(true);
    const { token } = userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    axios
      .get(`/api/admin/products/${id}`, config)
      .then((res) => {
        const product = res.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setColor(product.color);
        setFabric(product.fabric);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setImage(product.image);
        setIsActive(product.isActive);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity()) {
      // edit product
      editProduct();
    }
  };

  const editProduct = () => {
    setLoading(true);
    const { token } = userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    axios
      .put(
        `/api/admin/products/${id}`,
        {
          name,
          price,
          description,
          color,
          fabric,
          countInStock,
          image,
          isActive,
          category,
        },
        config
      )
      .then((res) => {
        setLoading(false);
        navigation("/admin/products");
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

  const uploadImage = (e) => {
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    const { token } = userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    axios
      .put("/api/admin/uploads", formData, config)
      .then((res) => {
        const { imageUrl } = res.data;
        setImage(imageUrl);
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

  return (
    <>
      <Button onClick={() => navigation(-1)}>Go Back</Button>
      <FormContainer title="Edit Product" size="12">
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Product name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="price" className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
            />
            <Form.Control.Feedback type="invalid">
              Price is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description" className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Description is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control type="file" onChange={uploadImage} accept="image/*" />
            <Form.Control.Feedback type="invalid">
              Image is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="category" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Category is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="category" className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Color is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="category" className="mb-3">
            <Form.Label>Fabric</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Fabric"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Fabric is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="countInStock" className="mb-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.valueAsNumber)}
            />
            <Form.Control.Feedback type="invalid">
              Count In Stock is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="isActive" className="mb-2 mt-4">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="switch"
              id="isActive"
              label="Procut is Active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <Form.Control.Feedback type="invalid">
              Status is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="float-end">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
