import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import customErrorHandler from "../services/customErrorHandler.js";
import { roles } from "../models/User.js";

export function verifyToken(req, res, next) {
  const authHeader = req?.headers?.authorization;

  if (!req.headers || !authHeader || !authHeader.startsWith("Bearer ")) {
    return next(customErrorHandler.unAuthorizedUser());
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return next(customErrorHandler.unAuthorizedUser());
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return next(customErrorHandler.unAuthorizedUser());
  }
}

export function verifyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === roles.USER) {
      next();
    } else {
      next(customErrorHandler.unAuthorizedUser());
    }
  });
}

export function verifyHotel(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === roles.HOTEL) {
      next();
    } else {
      next(customErrorHandler.unAuthorizedUser());
    }
  });
}

export function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === roles.ADMIN) {
      next();
    } else {
      next(customErrorHandler.unAuthorizedUser());
    }
  });
}
