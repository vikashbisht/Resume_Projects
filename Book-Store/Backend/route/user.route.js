import express from "express";
import { signUp } from "../controller/user.contrtoller.js";
import { signIn } from "../controller/user.contrtoller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);

export default router;
