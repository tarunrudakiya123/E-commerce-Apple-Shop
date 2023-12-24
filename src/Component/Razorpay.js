// import  razorpay from "react";
// import Razorpay from "razorpay";

import apiHelper from "../Common/ApiHelper";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(window.Razorpay);
    };
    document.body.appendChild(script);
  });
};

const RazorpayPayment = async (paymentOption) => {
  const razorpay = await loadRazorpay();
  // const navigate = useNavigate();

  console.log(paymentOption);

  const options = {
    key: paymentOption.apiKey,
    amount: paymentOption.amount,
    currency: paymentOption.currency,
    name: "AMaZon",
    description: "Test Payment",
    order_id: paymentOption.razorpayOrderId,
    handler: async function (response) {
    
      try {
        let paymentDetails = {
          orderId: paymentOption.orderId,
          paymentId: response.razorpay_payment_id,
          razorpayOrderId: paymentOption.razorpayOrderid,
        }; // eslint-disable-next-line
        const result = await apiHelper.verifyPayment(paymentDetails);
        if (
          result &&
          result.data &&
          result.data.message &&
          result.data.message === "success" &&
          result.data.orderId
        ) {
            paymentOption.navigate(`/OrderDetails/${result.data.orderId}`);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    prefill: {
      name: paymentOption.name,
      contact: paymentOption.mobile,
    },
    notes: {
      address: paymentOption.address,
    },
    theme: {
      color: "#F37254",
    },
    payment_method: {
      card: true,
      netbanking: true,
      wallet: true,
      upi: true,
    },
  };

  const RRazorpay = new razorpay(options);
  RRazorpay.open();
};

export default RazorpayPayment;
