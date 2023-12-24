import express from "express";
import OrderController from "./OrderController.js";
import authentication from "../../Common/Authentication/Auth.js";

const orderRouter = express.Router();
//product Order Api
// orderRouter.get("/:id", authentication.CreateOrderAuth, OrderController.orderItembyId);
// orderRouter.get("/get",authentication.CreateOrderAuth, OrderController.orderS)
orderRouter.get("/", OrderController.fetchAllOrders)
orderRouter.post("/create", authentication.CreateOrderAuth, OrderController.createOrder);
orderRouter.post("/verify", authentication.CreateOrderAuth, OrderController.verifyPayment);


export default orderRouter;
