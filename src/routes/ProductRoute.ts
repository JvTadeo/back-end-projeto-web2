import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

const productRoute = Router();
const productController = new ProductsController();

productRoute.get("/products", productController.getProducts);
productRoute.get("/customers", productController.getCustomers);

export default productRoute;