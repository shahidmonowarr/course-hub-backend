// imports
import { Router } from "express";
import { UpdateProduct, createProduct, deleteProduct, getAllProduct, getFeatherProducts } from "../controllers/Products/ProductsControllers.js";
import { UpdateAddToCart, confirmOrder, createAddToCart, deleteAddToCart, getAllAddToCart, getAllOrderProduct, getAllPay } from "../controllers/Products/addToCartControllers.js";
import { checkAuthUser } from "../middleware/authMiddleware.js";
// router
const router = Router();

// user register router
router.post("/create-product", createProduct);
router.delete('/delete-product/:id', deleteProduct)
router.patch('/update-product/:id', UpdateProduct)
router.get("/get-product", getAllProduct);
router.get("/get-product/:id", getAllProduct);
router.get("/get-feather-product", getFeatherProducts);
// exporting
// user register router

router.post("/add-to-cart/:id",checkAuthUser, createAddToCart);
router.delete('/delete-to-cart/:id',checkAuthUser, deleteAddToCart)
router.patch('/update-to-cart/:id',checkAuthUser, UpdateAddToCart)
router.get("/get-to-cart",checkAuthUser, getAllAddToCart);
router.get("/get-to-cart/:id",checkAuthUser, getAllAddToCart);
router.post("/confirm-order-products",checkAuthUser, getAllPay);
router.post("/get-order-products",checkAuthUser, getAllPay);
router.get("/get-all-order-products",checkAuthUser, getAllOrderProduct);
// exporting

// router.post('/confirm-order', confirmOrder)

export default router;