import { Router } from "express";

import {getProducts, getProductById, addProduct, updateProduct, deleteProduct, mockingProducts} from "../controllers/products.controller.js"
import { isAdmin } from '../middlewares/middlewares.js';
const router = Router();


router.get("/mockingproducts", mockingProducts)

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/", isAdmin, addProduct);

router.put("/:pid", isAdmin, updateProduct);

router.delete("/:pid", isAdmin, deleteProduct);

export default router;
