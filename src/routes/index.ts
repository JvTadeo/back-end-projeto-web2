import { Router } from "express";

import productRoute from "./ProductRoute";
import customerRoute from "./CustomerRoute";
import authRoute from "./AuthRoute";
import saleRoute from "./SaleRoute";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authRoute)
// Middleware
router.use(authMiddleware);

// Routes
router.use(productRoute);
router.use(customerRoute);
router.use(saleRoute);

export default router;