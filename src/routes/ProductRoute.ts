import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

const productRoute = Router();
const productController = new ProductsController();

productRoute.get("/products", productController.getProducts);
productRoute.get("/products/:id", productController.getProductById);
productRoute.post("/products", productController.createProduct);
productRoute.put("/products", productController.updateProduct);
productRoute.delete("/products/:id", productController.deleteProductById);

export default productRoute;