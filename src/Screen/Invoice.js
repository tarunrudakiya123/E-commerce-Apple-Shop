import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Invoice = ({ showComponent, setShowComponent, orderData, cart }) => {
    const handleClose = () => {
        setShowComponent(false);
    };

    // Function to format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };



    // Function to calculate total price
    const calculateTotalPrice = () => {
        return orderData.products.reduce((total, product) => total + product.price, 0);
    };

    return (
        <Dialog open={showComponent} onClose={handleClose} fullWidth maxWidth="lg" className='mt-5'>
            <DialogTitle><h2>Invoice</h2></DialogTitle>
            <DialogContent>
                <div>
                    <h5 className='mb-4'>Shipping Details:</h5>
                    <hr />
                    <p>Full Name: {orderData.userInfo.Address.fullName}</p>
                    <p>Email: {orderData.userInfo.Address.email}</p>
                    <p>Address: {orderData.userInfo.Address.address}, {orderData.userInfo.Address.city}, {orderData.userInfo.Address.state}, {orderData.userInfo.Address.pincode}</p>
                </div>


                <div className='mt-5'>
                    <hr />
                    <h5 className='mb-4'>Order Details:</h5>

                    {cart.map((x) => {
                        return (
                            <>
                                <section
                                    className="h-100"
                                    style={{ backgroundColor: "#eee" }}
                                >
                                    <div className="container py-3 h-100">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col">
                                                <div className="card shadow">
                                                    <div className="card-body p-4">
                                                        <div className="row">
                                                            <div
                                                                className="d-flex flex-row align-items-center text-center  justify-content-between  "
                                                                key={x._id}
                                                            >
                                                                <div>
                                                                    <img
                                                                        src={x.image?.url}
                                                                        className="img-fluid rounded-3"
                                                                        alt="Shopping item"
                                                                        style={{ height: "5rem" }}
                                                                    />
                                                                </div>
                                                                <div className="ms-3 ">
                                                                    <h5 className="mb-3">Name</h5>
                                                                    <h5>{x.name}</h5>
                                                                </div>
                                                                <div className="ms-3 ">
                                                                    <h5 className="mb-3">Quantity</h5>
                                                                    <h5>{x.quantity}</h5>
                                                                </div>
                                                                <div className="ms-3 px-4">
                                                                    <h5 className="mb-3">Price </h5>
                                                                    <h5>$ {x.price}</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        );
                    })}
                </div>
                <div className='mt-3'>

                    <h5 className='mb-4 text-success'>Total Price: {formatPrice(calculateTotalPrice())}</h5>

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Invoice;
