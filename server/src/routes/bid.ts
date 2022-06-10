import express from "express";
import controller from "../contollers/bid";

const router = express.Router();

router.post("/", controller.attendBid);
router.put("/:id", controller.updateBid);
router.delete("/:id", controller.finishBid);

export default router;
