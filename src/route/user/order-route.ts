import { Router } from "express";
import { Auth } from "../../middleware/auth.js";
import { getMyOrder, productOrder } from "../../controller/order-controller.js";

export const orderRoute = Router();

orderRoute.route("/esewa").post(Auth, productOrder);
orderRoute.route("/").get(Auth, getMyOrder);