import express from "express";
import controller from "../contollers/board";
import verifyJWT from "../middleware/verifyJWT";
const router = express.Router();

router.get("/all", verifyJWT, controller.allBoard);
router.get("/:id", verifyJWT, controller.getBoard);
router.post("/", verifyJWT, controller.writeBoard);
router.put("/:id", verifyJWT, controller.updateBoard);
router.delete("/:id", verifyJWT, controller.deleteBoard);

export default router;
