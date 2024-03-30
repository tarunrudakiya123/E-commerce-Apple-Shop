import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import CheckoutSteps from "../Component/CheckoutSteps";
import ErrorMessage from "./ErrorMessage";
import { TextField } from "@mui/material";

export default function ShippingScreen() {
  const [error, setError] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      mobile: "",
      city: "",
      state: "",
      email: "",
      pincode: "",
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required("Full Name is required"),
      address: Yup.string().required("Address is required"),
      mobile: Yup.string().required("Mobile No. is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string().required("Pin Code is required"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (values) => {
    try {
      setIsLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      userInfo.Address = values;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLoading(false);

      navigate("/paymentMethod");
    } catch (error) {
      setIsLoading(false);
     
    }
  };

  return (
    <>
      <div className="container py-5 ">
        <CheckoutSteps activeStep={1} />
        <ErrorMessage error={error} setError={setError}/>
        <Loader isLoding={isLoading} />
      </div>
      <div className="container ">
        <form onSubmit={formik.handleSubmit} className="row g-3  needs-validation">
          <div className="col-md-12">
            <label className="form-label">Full Name</label>
            <TextField
              variant="outlined"
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <TextField
              variant="outlined"
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Mobile No.</label>
            <TextField
              variant="outlined"
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              type="tel"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <TextField
              variant="outlined"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <TextField
              variant="outlined"
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">State</label>
            <TextField
              variant="outlined"
              select
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-select"
              SelectProps={{
                native: true,
              }}
            >
              <option disabled>Choose...</option>
              <option>Gujarat</option>
              <option>Maharastra</option>
              <option>Rajasthan</option>
              <option>Goa</option>
              <option>MP</option>
              <option>Delhi</option>

            </TextField>
          </div>
          <div className="col-md-3">
            <label className="form-label">Pin Code</label>
            <TextField
              variant="outlined"
              error={formik.touched.pincode && Boolean(formik.errors.pincode)}
              helperText={formik.touched.pincode && formik.errors.pincode}
              type="text"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
          </div>
          <div className="col-12 mt-5">
            <button
              type="submit"
              className="btn btn-outline-warning  mb-3"
              disabled={isLoading}
            >
              Order Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
