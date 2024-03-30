import Footer from "./Component/Footer";
import Header from "./Component/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Screen/Home";
import ProductScreen from "./Screen/ProcuductScreen";
import CartScreen from "./Screen/CartScreen";
import { useState } from "react";
import ShippingScreen from "./Screen/ShippingScreen";
import Payment from "./Screen/Payment";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import RazorpayPayment from "./Component/Razorpay";
import OrderDetials from "./Screen/OrderDetails";
import  { LoginForm } from "./NewComponents/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  { ForgotPasswordForm } from "./NewComponents/ForgotPassword";
import ResetPassword from "./NewComponents/ResetPassword";
import { SignUpForm } from "./NewComponents/SignUp";


function App() {

  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"));


  return (
    <>
      <BrowserRouter>
        <ToastContainer style={{ marginTop: "60px" }} />
        <Header
          token={token}
          setToken={setToken}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />

        <main style={{ minHeight: "40vh" }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/product/:id"
              element={
                <ProductScreen
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            ></Route>
            <Route path="/signup" element={<SignUpForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/forgotPassword" element={<ForgotPasswordForm />}></Route>
            <Route path="/resetPassword" element={<ResetPassword />}></Route>

            <Route
              path="/cart"
              element={
                <CartScreen cartItems={cartItems} setCartItems={setCartItems} />
              }
            ></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            <Route path="/paymentMethod" element={<Payment />}></Route>
            <Route
              path="/OrderDetails/:orderId"
              element={
                <OrderDetials
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            ></Route>
            <Route path="/checkout" element={<RazorpayPayment />}></Route>
            
            <Route
              path="/placeorder"
              element={
                <PlaceOrderScreen
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            ></Route>
            <Route path="/payment" element={<RazorpayPayment />}></Route>
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
