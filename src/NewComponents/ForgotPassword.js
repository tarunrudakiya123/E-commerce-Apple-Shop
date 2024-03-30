import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

import { userLogin } from '../Api/authSlice';

const initialValues = {

  email: '',
};

const ForgotPasswordSchema = Yup.object().shape({

  email: Yup.string().email('Invalid email').required('Email is required*'),
});

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await dispatch(userLogin(values));

      if (response.type.includes("fulfilled")) {
        toast.success('Forgot Password Successfully');

      } else {
        toast.error(response.payload)
      }
    } catch (error) {
      console.error('Error during Forgot Pass.:', error);
      toast.error({ general: 'Forgot Pass. failed. Please try again.' })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="row align-items-center justify-content-between m-3">
        <div className="col-md-8 order-md-1 mt-3 ForgotPassword_page ">


        </div>

        <div className="col-md-4 col-12 order-md-2 mt-md-0 mt-4 px-md-5 px-4">
          <div className='text-center'>
            <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src="https://assets-v2.lottiefiles.com/a/66d31bbc-1151-11ee-8507-739ffcf7bc3c/NmBS3qhYyP.gif" alt="animation" />
            <h3 className="mb-2">Forgot Password??</h3>

          </div>

          <Formik initialValues={initialValues} validationSchema={ForgotPasswordSchema} onSubmit={handleSubmit}>
            {({isSubmitting }) => (
              <Form>


                <div>
                  <Field as={TextField} id="email" name="email" type="email" label="Email" variant="outlined" fullWidth margin="normal" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>


                <div className="col-10 mt-2">
                  <button type="submit" className="button-88 " disabled={isSubmitting}>
                    Submit
                  </button>





                </div>


              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
