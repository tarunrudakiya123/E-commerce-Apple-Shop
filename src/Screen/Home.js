import { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import Loader from "./Loader";
import apiHelper from "../Common/ApiHelper";
import ErrorMessage from "./ErrorMessage";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({ message: "", type: "" });

  const GetProducts = async () => {
    try {
      setisLoading(true);
      
      const result = await apiHelper.fetchProducts();
      if (result.status === 200) {
        setProduct(result.data.products);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error?.response?.data?.message) {
        setError({
          ...error,
          message: error.response.data.message,
          type: "danger",
        });

      }
    }
  };
  useEffect(() => {
    GetProducts();
    // eslint-disable-next-line
  }, []);

  return (


    // <main className='container' style={{ minHeight: "83.2vh" }}>

    <main className="container-fluid">

      <div>

        <ErrorMessage error={error} setError={setError} />

        <Loader isLoading={isLoading} />
        <div className="row m-0">
          <h1 className=' ms-2  Product_title1'><span className="Store fw-bold">Store.</span> The best way to buy the products you love.</h1>
        </div>

        <div className='row mt-4'>
          <div className="card-group gap-4">

            <div className="card border rounded">

              <h6 className="card-title fw-bold ms-3 mt-2 text-primary" >New</h6>
              <h2 className="card-title fw-bold ms-3 mt-1">In with the new.</h2>
              <img src="images/NewImg/Group Product3.JPG" className="card-img-top" alt="props" />

            </div>

            <div className=" Video_Card card border rounded d-none d-md-flex" style={{ background: "#000000" }}>
              <h6 className="card-title fw-bold ms-3 mt-2 text-white">Better Experince</h6>
              <h2 className="card-title fw-bold ms-3 mt-1 text-white">Beyond Pro.</h2>
              {/* <img src="Apple Images/Iphone-2.jpeg" className="card-img-top" alt="props" /> */}

              <video className="ms-4" width="340" height="440" autoPlay loop muted auto="true"  >
                <source src="/images/NewImg/Iphone14Pro.mp4" type="video/mp4" />
                <source src="/images/NewImg/Iphone14Pro.ogg" type="video/ogg" />
              </video>

            </div>


            <div className="card border rounded">
              <h6 className="card-title fw-bold ms-3 mt-2 text-success">Starts from $1200*</h6>
              <h2 className="card-title fw-bold ms-3 mt-1">Adventure awaits.</h2>
              <img src=" images/NewImg/Watch22.JPG" className="card-img-top mt-5" alt="props" />

            </div>

          </div>

        </div>

        <div className="row d-flex ">
          <h2 className='ms-2 mt-3 col-6 Product_title2 mt-2'> All models. Take your pick.</h2>
        </div>

      </div>

      <div className=' row d-flex flex-wrap align-items-center justify-content-around  mt-4 m-0'>

        {product &&
          product?.map((data) => {
            return <ProductCard key={data._id} product={data} />;
          })}

      </div>

      <div className='ms-3 mb-5'>
        <h3 className=' Product_title1 mt-5'><b>The latest.</b> Take a look at what’s new right now.</h3>


      </div>

      {/* 

      <div className="container mt-2 ">
        <h3 className=' ms-2 p-2   Product_title1 mt-5'><b>The latest.</b> Take a look at what’s new right now.</h3>
      </div> */}


      <div className=' border-none m-0 p-0 '>
        <div className=" text-white mt-2 ">
          <img src="images/NewImg/Group Product1.JPEG" className="card-img img-fluid" alt="Props" />
         
        </div>
      </div>





    </main>


  );
};

export default Home;
