import express, { Request, Response, NextFunction } from "express";
import test from "../contollers/test";

const router = express.Router();

router.get("/test", test);

export default router;
