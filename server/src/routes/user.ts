import express, { Request, Response, NextFunction } from "express";
import controller from "../contollers/user";
import verifyJWT from "../middleware/verifyJWT";
import kakao from "../contollers/kakao";
const router = express.Router();

router.get("/validate", verifyJWT, controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.put("/update", verifyJWT, controller.updateUserInfo);
router.delete("/delete", verifyJWT, controller.deleteAccount);
router.post("/kakao", kakao);
export default router;
