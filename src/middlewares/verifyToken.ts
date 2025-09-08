import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}



export function verifyToken(req: Request, res: Response, next: NextFunction) {
  let authHeader = req.headers["authorization"] || req.headers["token"];
    console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}


export function verifyTokenAndAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed [ Forbidden ]." });
    }
  });
}

export function verifyTokenAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "you are not allowed, only admin allowed" });
    }
  });
}
