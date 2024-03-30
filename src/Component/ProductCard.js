import React from "react";
import { Link } from "react-router-dom";
import "../NewComponents/css/ProductCard.css";

function ProductCard(props) {
  const { product } = props;

  return (



    <div className="col-md-3 col-12 mb-4">
      <Link to={`/product/${product?._id}`} className="text-decoration-none">
        <div className="card-container">
          <div className="card h-100 border-0 shadow ProductCard " style={{ border: "1px solid black" }}>
            <div className="d-flex align-items-center justify-content-between m-2" >

              <div className="m-2"> <i
                style={{ fontSize: "20px" }}
                className="fab fa-apple"
                id="AppleIcon"
              ></i></div>


              {product.discount > 0 && (
                <div>
                  <span className="badge bg-success">
                    {product?.discount}% off
                  </span>
                </div>
              )}
            </div>

            <div className="position-relative"  style={{overflowX:"hidden"}}>
              <img
                src={product?.image?.url}
                className=" ms-5 mt-5 rounded-top img-fluid"
                alt={product?.name}
                style={{ height: "200px" }}
              />


            </div>
            <div className="card-body">
              <h5 className="card-title mb-3">{product?.name}</h5>
              <p className="card-text mb-2 text-muted">{product.category.name}</p>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  {/* <Rating rating={product?.rating} /> */}
                  Price
                </div>
                <span className="text-muted">
                  &#8377; {product?.price.toFixed(2)} /-
                </span>
              </div>



              <button className="btn btn-primary w-100">
                Buy Now
                <span className="fw-bold text-light ms-2">
                  &#8377; {product.totalPrice.toFixed(2)}/-
                </span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>




  );
}

export default ProductCard;
