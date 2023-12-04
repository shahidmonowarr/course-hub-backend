// imports
import { Router } from "express";
import { checkAdmin } from "../middleware/authMiddleware.js";
import { createUserFeedaBack, deleteUserFeedaBack, getAllUserFeedaBack } from "../controllers/UserFeedaBack/UserFeedaBackControllers.js";
// router
const router = Router();

// user register router
router.post("/send-feedback", createUserFeedaBack);
router.delete("/delete-feedback", deleteUserFeedaBack);
router.get('/get-feedback', checkAdmin, getAllUserFeedaBack)
router.get('/get-feedback/:id', checkAdmin, getAllUserFeedaBack)


// exporting
export default router;