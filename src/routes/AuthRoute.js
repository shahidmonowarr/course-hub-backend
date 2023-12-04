// imports
import { Router } from "express";
import { deleteUser, getAllUser, getUserProfile, login, register, updateProfile, updateUserRole } from "../controllers/Auth/AuthUser.js";
import { checkAdmin, checkAuthUser } from "../middleware/authMiddleware.js";
// router
const router = Router();

// user register router
router.post("/register", register);
router.post("/login", login);
router.get('/get-user', checkAdmin, getAllUser)
router.patch('/update-user-role/:id', checkAdmin, updateUserRole)
router.get('/get-user-profile', checkAuthUser, getUserProfile)
router.patch('/update-profile', checkAuthUser, updateProfile)
router.delete('/delete-user/:id', checkAuthUser, deleteUser)
// exporting
export default router;