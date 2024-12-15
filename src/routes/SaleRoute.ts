import { Router } from "express";
import { SaleController } from "../controllers/SaleController";

const saleRoute = Router();
const saleController = new SaleController();

saleRoute.get("/sales", saleController.getSales);

export default saleRoute;