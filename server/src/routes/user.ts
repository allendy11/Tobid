import express, { Request, Response, NextFunction } from "express";
import controller from "../contollers/user";
import verifyJWT from "../middleware/verifyJWT";
import kakao from "../contollers/kakao";
import google from "../contollers/google";
import upload from "../middleware/upload";
const router = express.Router();

router.get("/validate", verifyJWT, controller.validateToken);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.put("/:id/username", verifyJWT, controller.updateUserName);
router.put("/:id/mobile", verifyJWT, controller.updateMobile);
router.put(
  "/:id/image",
  verifyJWT,
  upload.localProfileUpload.single("img"),
  controller.updateImage
);
router.delete("/delete", verifyJWT, controller.deleteAccount);
router.post("/kakao", kakao);
router.post("/google", google);
export default router;
