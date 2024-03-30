import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';


const ResetSchema = Yup.object().shape({

  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),

});

const initialValues = {


  password: '',

};


const ResetPassword = () => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (values) => {
    // const response = await dispatch(userSignUp(values));
    // if (response) {
    //   toast.success('Reset Password Successfully');
    // }
  };



  return (
    <div>
      <div className="row align-items-center justify-content-center m-0 ">

        <div className="col-md-7 order-md-1  ResetPassword_page p-0">


        </div>



        <div className="col-md-4 order-md-2 mt-md-0 mt-4 px-md-0 px-5">

          {/* Signup Form */}
          <Formik initialValues={initialValues} validationSchema={ResetSchema} onSubmit={handleSubmit}>
            <Form >
              <div className='text-center'>
                <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src="https://assets-v2.lottiefiles.com/a/66d31bbc-1151-11ee-8507-739ffcf7bc3c/NmBS3qhYyP.gif" alt="animation" />
                <h3 className="mb-2 mt-2">Reset Password</h3>
              </div>



              <div>

                <div>
                  <div>
                    <FormControl variant="outlined">
                      <TextField
                        className='ms-3'
                        id="password"
                        name="password"
                        type={visible ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
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
                    <ErrorMessage name="password" component="div" className="text-danger  ms-3"   />

                  </div>


                </div>
              </div>

         

              <div className="col-12 mt-2 ms-3 p-0 ">
                <button type="submit" className="button-99">Submit</button>

                {/* <div><Link to={"/forgotPassword"}> <strong style={{ fontSize: "13px" }}>Forgot Password!</strong></Link></div> */}


              </div>



            </Form>
          </Formik>

        </div>


      </div>
    </div>
  );
};

export default ResetPassword;
