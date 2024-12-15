import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

const productRoute = Router();
const productController = new ProductsController();

productRoute.get("/products", productController.getProducts);
productRoute.post("/products", productController.createProduct);
productRoute.put("/products", productController.updateProduct);

export default productRoute;