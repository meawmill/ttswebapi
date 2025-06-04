import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.slice(7);
      const decoded = jwt.verify(token, process.env.AUTH_SECRET!);
      (req as any).user = decoded;
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  res.status(401).json({ message: "Unauthorized" });
}
