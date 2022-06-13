import express from "express";
import controller from "../contollers/bid";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.get("/all", verifyJWT, controller.allBid);
router.post("/:id", verifyJWT, controller.attendBid);
router.put("/:id", verifyJWT, controller.updateBid);
router.get("/finish", controller.finishBid);

export default router;
