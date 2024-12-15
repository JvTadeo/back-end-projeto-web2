import { Router } from "express";
import { SaleController } from "../controllers/SaleController";

const saleRoute = Router();
const saleController = new SaleController();

saleRoute.get("/sales", saleController.getSales);
saleRoute.get("/sales/:customer_id", saleController.getSalesByCustomerId);
saleRoute.get("/sales/report/:customer_id", saleController.getSalesReportByCustomerId);

saleRoute.post("/sales/report/period", saleController.getSalesByPeriod);
saleRoute.post("/sales", saleController.createSale);
export default saleRoute;