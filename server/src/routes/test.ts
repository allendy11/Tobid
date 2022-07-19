import express, { Request, Response, NextFunction } from "express";
import controller from "../contollers/test";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.get("/", controller.test);

export default router;
