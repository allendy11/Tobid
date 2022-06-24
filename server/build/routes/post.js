"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../contollers/post"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const router = express_1.default.Router();
router.get("/all", verifyJWT_1.default, post_1.default.allPosts);
router.get("/:id", verifyJWT_1.default, post_1.default.getPost);
router.post("/", verifyJWT_1.default, post_1.default.writePost);
router.put("/:id", verifyJWT_1.default, post_1.default.updatePost);
router.delete("/:id", verifyJWT_1.default, post_1.default.deletePost);
exports.default = router;
