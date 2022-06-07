import express, { Request, Response, NextFunction } from "express";
import test from "../contollers/test";
import controller from "../contollers/user";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.post("/test", test);
router.get("/validate", verifyJWT, controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login);
export default router;
