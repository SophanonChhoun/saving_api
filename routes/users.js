import express from "express";
import {
    loginUser,
    getUserProfile,
    registerUser,
    updateUserPassword,
    updateUserProfile
} from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js";

var router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
    .patch(protect, updateUserPassword);

export default router;