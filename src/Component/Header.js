// import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {

    const { cartItems, setCartItems, token, setToken, userInfo, setUserInfo } = props;


    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem("userToken") || "")
        setUserInfo(localStorage.getItem("UserInfo"))
    }, [setUserInfo, setToken, navigate])


    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        //eslint-disable-next-line
    }, [])

    return (
        <div style={{ position: "sticky", top: "0", zIndex: "1000000" }}>
            <nav className="navbar navbar-expand-lg p-0 " >
                <div className="container-fluid  align-items-center">
                    <Link to={"/"} className='Logo'>

                        <p className="navbar-brand">
                            <img style={{ height: "50px", borderRadius: "100px 100px" }} src="/images/NewImg/apple-event.gif" alt="logo" className="img-fluid ms-2" />
                        </p>
                    </Link>

                    <div className="button d-flex align-items-center ">
                        <Link to={"/cart"}>
                            <i className="fa-brands fa-apple-pay m-1 mt-2 text-body position-relative" style={{ fontSize: "40px" }}>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "10px" }}>
                                    {cartItems.length}
                                </span></i></Link>

                        <button
                            style={{ outline: "none", border: "none" }}
                            type="button"
                            onClick={!token && !userInfo ? () => navigate("/login") : () => {

                                localStorage.removeItem("UserInfo")
                                setUserInfo(localStorage.getItem("UserInfo"))


                                localStorage.removeItem("userToken")
                                setToken(localStorage.getItem("userToken"))
                                navigate("/")
                            }}>
                            {!token && !userInfo ?

                                <img style={{ height: "70px" }} src="images/NewImg/apple-signinbutton-560-removebg-preview.png" alt="signIn" />

                                :

                                <img style={{ height: "50px", width: "170px", borderRadius: "50%", }} alt="sigout" src="/images/NewImg/signout.png"/>

                            }
                        </button>

                        {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" /> */}

                    </div>
                </div>
            </nav>
        </div>
    );
}
