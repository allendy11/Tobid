"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bid_1 = __importDefault(require("../contollers/bid"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const router = express_1.default.Router();
router.get("/all", verifyJWT_1.default, bid_1.default.allBid);
router.post("/:id", verifyJWT_1.default, bid_1.default.attendBid);
router.put("/:id", verifyJWT_1.default, bid_1.default.updateBid);
router.get("/finish", bid_1.default.finishBid);
exports.default = router;
