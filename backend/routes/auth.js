import express from "express";
import protectRoute from "../middleware/verify.js";
import { body } from 'express-validator';
import { loginUser, logoutUser, signupUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.post("/signup", [
        body('name').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    signupUser);
router.post("/login", [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
  ],
  loginUser
);
router.post("/logout", logoutUser);
router.put("/update/:id", protectRoute, [
        body('name').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Valid email is required'),
    ],
    updateUser);

export default router;