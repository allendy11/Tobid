import express from "express";
import controller from "../contollers/board";
import verifyJWT from "../middleware/verifyJWT";
const router = express.Router();

router.get("/board/all", verifyJWT, controller.getBoard);
router.get("/board/:id", verifyJWT, controller.getBoard);
router.post("/board", verifyJWT, controller.writeBoard);
router.put("/board/:id", verifyJWT, controller.updateBoard);
router.delete("/board/:id", verifyJWT, controller.deleteBoard);

export default router;
