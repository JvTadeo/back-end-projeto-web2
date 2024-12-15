import { Router } from "express";

import productRoute from "./ProductRoute";
import customerRoute from "./CustomerRoute";
import authRoute from "./AuthRoute";
import saleRoute from "./SaleROute";

const router = Router();

router.use(authRoute)
router.use(productRoute);
router.use(customerRoute);
router.use(saleRoute);

export default router;