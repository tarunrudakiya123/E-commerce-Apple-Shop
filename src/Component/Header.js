import { useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";

export default function Header(props) {
    const { cartItems, setCartItems,token, setToken ,userInfo, setUserInfo } = props
    const navigate = useNavigate();
    useEffect(()=>{
        setToken(localStorage.getItem("token")||"")
        setUserInfo(localStorage.getItem("userInfo"))
    },[setUserInfo,setToken,navigate])

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        //eslint-disable-next-line
    }, [])

    return (
        <div style={{ position: "sticky", top: "0", zIndex: "1000000" }}>
            <nav className="navbar navbar-expand-lg bg-light ">
                <div className="container-fluid">
                <div className='Logo'>
          <a className="navbar-brand" href="##">
          
            <i style={{ fontSize: "29px" }} className="fa-brands fa-apple  AppleIcon "></i>
          
          </a>
        </div>
                    
                    <div className="button d-flex gap-3 ">
                        <Link to={"/cart"}>
                            <i className="fa-brands fa-apple-pay m-1 me-3 mt-2 text-body position-relative" style={{  fontSize: "40px" }}>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-6">
                                    {cartItems.length}
                                </span></i></Link>


                    

                        <button 
                        type="button" 
                        onClick={!token && !userInfo? ()=>navigate("/login"):()=>{
                            localStorage.removeItem("userInfo")
                            setUserInfo(localStorage.getItem("userInfo"))
                            localStorage.removeItem("token")
                            setToken(localStorage.getItem("token"))
                            navigate("/")
                        }} className="btn btn-outline-success me-3">
                            {!token && !userInfo?"Sign In":"Sign Out"}
                            </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
