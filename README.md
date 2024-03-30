import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';


const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  upload: Yup.mixed().required('Upload is required'),
  country: Yup.object().required('Country is required'),
});

const initialValues = {

  email: '',
  password: '',

};


const Login = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    // const response = await dispatch(userSignUp(values));
    // if (response) {
    //   toast.success('Signup Successfully');
    // }
  };



  return (
    <div>
      <div className="row align-items-center justify-content-center m-0 gap-5">

        <div className="col-md-8 order-md-1  Login_page">


        </div>



        <div className="col-md-3 order-md-2">

          {/* Signup Form */}
          <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
            <Form >
              <div className='text-center'>
                <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src="https://assets-v2.lottiefiles.com/a/66d31bbc-1151-11ee-8507-739ffcf7bc3c/NmBS3qhYyP.gif" alt="animation" />
                <h3 className="mb-2">Login</h3>
              </div>



              <div>


                <div>
                  <TextField id="email" name="email" type="email" label="Email" variant="outlined" fullWidth margin="normal" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div>
                  <div>
                    <FormControl variant="outlined">
                      <TextField

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
                    <ErrorMessage name="password" component="div" className="text-danger" />

                  </div>


                </div>
              </div>

              <div className="col-12 mt-2 d-flex align-items-center justify-content-center mb-2 ">
                <div> <span style={{ fontSize: "13px" }} >Don't have a account</span> <Link to={"/signup"}> <strong style={{ fontSize: "13px" }}>SingUp!</strong></Link></div>

              </div>

              <div className="col-12 mt-2 d-flex align-items-center justify-content-between gap-5 p-0 ">
                <button type="submit" className="button-99">Submit</button>

                <div><Link to={"/forgotPassword"}> <strong style={{ fontSize: "13px" }}>Forgot Password!</strong></Link></div>


              </div>



            </Form>
          </Formik>

        </div>


      </div>
    </div>
  );
};

export default Login;
