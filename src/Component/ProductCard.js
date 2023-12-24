import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { product } = props;

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <Link to={`/product/${product._id}`}>
        <div
          className="card  "
          style={{ boxShadow: "0px 0px 3px -3px inset dimgrey ", height:"530px" }}
        >
          <img
            src={product?.image?.url}
            className="card-img-top w-100 img-fluid"
            alt="..."
          />
          <div className="card-body">
            <h3 className="card-title">{product.name} </h3>
            <div className="d-flex justify-content-between">
              <span style={{ color: "#27374D" }}>{product.category.name}</span>
              <span style={{ color: "#27374D" }}>
                <div className="col d-flex justify-content-end">
                  <span className=" text-warning">
                    <Rating rating={product.rating} />
                  </span>
                </div>
              </span>
            </div>
            <p className="d-flex justify-content-between">
              <span style={{ color: "#27374D" }}>M.R.P. </span>
              <span> &#8377; {product.price} /-</span>
            </p>

            <div className="row mb-1 ">
              <div className="col ">
                <span
                  className="card-text  text-center"
                  style={{ color: "#393E46" }}
                >
                  {product.brand}
                </span>
              </div>
              <div className="col d-flex justify-content-end">
                <span
                  className={`fw-bold ${
                    product.discount > 0 ? "d-flex" : "d-none"
                  }`}
                  style={{ color: "#9DB2BF" }}
                >
                  {product.discount}% off
                </span>
              </div>
            </div>

            <button  className="btn btn-outline-primary w-100 mt-3">
              Let's Buy It on
              <span className="fw-bold text-danger " style={{ opacity: "0.8" }}>
                &nbsp; &#8377; {product.totalPrice}/-
              </span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;