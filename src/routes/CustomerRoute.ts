import { Router } from "express";
import { CustomerController } from "../controllers/CustomerControlers";

const customerRoute = Router();
const customerController = new CustomerController();

customerRoute.get("/customers", customerController.getCustomers);

export default customerRoute;