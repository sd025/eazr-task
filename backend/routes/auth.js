import express from "express";
import { body } from 'express-validator';
import { loginUser, logoutUser, signupUser } from "../controllers/users.js";

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


export default router;