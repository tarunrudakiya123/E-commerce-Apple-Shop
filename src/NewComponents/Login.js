import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import CheckoutSteps from '../Component/CheckoutSteps';
import apiHelper from '../Common/ApiHelper';

const initialValues = {
  email: '',
  password: '',
};

const LoginSchema = Yup.object().shape({

  email: Yup.string().email('Invalid email').required('Email is required*'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required*'),
});

export const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search.split("?redirect=")[1];

  const token = localStorage.getItem("userToken") || "";

  useEffect(() => {
    if (token) {
      navigate("/");
    } // eslint-disable-next-line
  }, [token]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {

      const response = await apiHelper.userLogin((values));




      if (response && response.statusText === "OK") {
        toast.success('Login Successfully');
        if (!redirect) return navigate("/");
        navigate("/" + redirect);

      }
    }


    catch (error) {
      console.error('Error during login:', error?.response?.data);
      toast.error(`Error during login: ${error?.response?.data?.validationResult[0]?.message}`)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="row align-items-center justify-content-between m-3 ">
        {redirect && <CheckoutSteps activeStep={0} />}

        <h2 className="text-center mt-2">Welcome Back </h2>

        <div className="col-md-8 order-md-1  Login_page">


        </div>

        <div className="col-md-4 col-12 order-md-2 mt-md-0 mt-4 px-md-3 px-0">
          <div className='text-center'>
            <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src="https://assets-v2.lottiefiles.com/a/66d31bbc-1151-11ee-8507-739ffcf7bc3c/NmBS3qhYyP.gif" alt="animation" />
            <h3 className="mb-2">Login</h3>

          </div>

          <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>


                <div>
                  <Field as={TextField} id="email" name="email" type="email" label="Email" variant="outlined" fullWidth margin="normal" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <Field
                      as={TextField}
                      id="password"
                      name="password"
                      type={visible ? 'text' : 'password'}
                      label="Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle visibility"
                              onClick={() => setVisible(!visible)}
                              edge="end"
                            >
                              {visible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <div className="col-12 mt-2 d-flex align-items-center justify-content-between">
                  <button type="submit" className="button-88" disabled={isSubmitting}>
                    Submit
                  </button>


                  <div>
                    <span>Don't have an Account?</span>
                    <Link to={'/signup'}>
                      <strong style={{ fontSize: '13px' }}>SignUp!</strong>
                    </Link>
                  </div>


                </div>

                <div className="col-12 mt-2 d-flex align-items-center justify-content-between">
                  {/* <button type="submit" className="button-88" disabled={isSubmitting}>
                    Forgot Password
                  </button> */}
                  <span>Not Remember Password?</span>



                  <div>
                    {/* <span>Don't have an Account?</span> */}
                    <Link to={'/forgotPassword'}>
                      <strong style={{ fontSize: '13px' }}>Forgot Password!</strong>
                    </Link>
                  </div>


                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
