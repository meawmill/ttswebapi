import { Request, Response, NextFunction } from "express";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://178.108.8.8:3000",
  "http://178.108.8.8:3001",
  "http://ttswebservice:3000",
  "http://ttswebservice:3001",
];

export function customCors(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  }

  next();
}
