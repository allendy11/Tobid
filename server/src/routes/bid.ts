import express from "express";
import controller from "../contollers/bid";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.get("/", verifyJWT, controller.getBid);
router.post("/:id", verifyJWT, controller.attendBid);
router.put("/:id", verifyJWT, controller.updateBid);
router.delete("/:id", verifyJWT, controller.finishBid);

export default router;
