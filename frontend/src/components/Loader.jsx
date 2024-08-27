import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="text-center">
      <Spinner animation="grow" variant="success" />
    </div>
  );
};

export default Loader;
