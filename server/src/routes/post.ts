import express from "express";
import controller from "../contollers/post";
import verifyJWT from "../middleware/verifyJWT";
const router = express.Router();

router.get("/all", verifyJWT, controller.allPosts);
router.get("/:id", verifyJWT, controller.getPost);
router.post("/", verifyJWT, controller.writePost);
router.put("/:id", verifyJWT, controller.updatePost);
router.delete("/:id", verifyJWT, controller.deletePost);

export default router;
