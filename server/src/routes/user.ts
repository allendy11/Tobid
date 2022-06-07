import express, { Request, Response, NextFunction } from "express";
import test from "../contollers/test";
import controller from "../contollers/user";
import extractJWT from "../middleware/extractJWT";

const router = express.Router();

router.get("/test", test);
router.get("/validate", extractJWT, controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login);
export default router;
