import express from "express";
import controller from "../contollers/board";

const router = express.Router();

router.get("/board/all", controller.getBoard);
router.get("/board/:id", controller.getBoard);
router.post("/board", controller.writeBoard);
router.put("/board/:id", controller.updateBoard);
router.delete("/board/:id", controller.deleteBoard);

export default router;
