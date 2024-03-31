import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import apiHelper from '../Common/ApiHelper';

const initialValues = {
  name: '',
  phone: '',
  email: '',
  password: '',
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required*'),
  phone: Yup.string().required('Phone is required*'),
  email: Yup.string().email('Invalid email').required('Email is required*'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required*'),
});

export const SignUpForm = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();




  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const finalData = { ...values};

      const response = await apiHelper.userRegister((finalData));

      if(response.statusText ===  "OK"){
        toast.success('Signup Successfully');
        navigate('/login');
      }


     
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup Failed');
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="row align-items-center justify-content-center m-0">
        <h2 className="text-center mt-2">Welcome to Apple Shop</h2>

        <div className="col-md-7 order-md-1 Sign_page">
          {/* Additional content for Sign_page */}
        </div>

        <div className="col-md-5 col-12 order-md-2 mt-md-0  px-md-4 px-4">
          <div className='text-center'>
            <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src="https://assets-v2.lottiefiles.com/a/66d31bbc-1151-11ee-8507-739ffcf7bc3c/NmBS3qhYyP.gif" alt="animation" />
            <h3 className="mb-2">Signup!</h3>

          </div>

          <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
            {({  isSubmitting }) => (
              <Form>
                <div>
                  <Field as={TextField} id="name" name="name" label="Name" variant="outlined" fullWidth margin="normal" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>

                <div>
                  <Field as={TextField} id="phone" name="phone" label="Phone" variant="outlined" fullWidth margin="normal" />
                  <ErrorMessage name="phone" component="div" className="text-danger" />
                </div>

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

                <div className="col-12 mt-2 d-flex gap-5">
                  <button type="submit" className="button-88" disabled={isSubmitting}>
                    Submit
                  </button>
                  <div>
                    <span>Already have an Account?</span>{' '}
                    <Link to={'/login'}>
                      <strong style={{ fontSize: '13px' }}>Login!</strong>
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
