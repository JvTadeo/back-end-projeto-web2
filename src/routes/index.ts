import { Router } from "express";
import productRoute from "./ProductRoute";

const router = Router();

router.use(productRoute);

export default router;