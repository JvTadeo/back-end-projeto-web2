import { Router } from "express";
import { CustomerController } from "../controllers/CustomerControlers";

const customerRoute = Router();
const customerController = new CustomerController();

customerRoute.get("/customers", customerController.getCustomers);
customerRoute.post("/customers", customerController.createCustomer);
customerRoute.put("/customers", customerController.updateCustomer);
export default customerRoute;