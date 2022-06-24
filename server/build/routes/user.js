"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../contollers/user"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const router = express_1.default.Router();
router.get("/validate", verifyJWT_1.default, user_1.default.validateToken);
router.post("/register", user_1.default.register);
router.post("/login", user_1.default.login);
router.put("/update", verifyJWT_1.default, user_1.default.updateUserInfo);
router.delete("/delete", verifyJWT_1.default, user_1.default.deleteAccount);
exports.default = router;
