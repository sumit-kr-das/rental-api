import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import customErrorHandler from "../services/customErrorHandler.js";

export function verifyToken(req, res, next) {
	const authHeader = req?.headers?.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, JWT_SECRET, (err, user) => {
			if (err) {
				return next(customErrorHandler.unAuthorizedUser());
			}
			req.user = user;
			next();
		});
	} else {
		return next(customErrorHandler.unAuthorizedUser());
	}
}

export function verifyUser(req, res, next) {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			next(customErrorHandler.unAuthorizedUser());
		}
	});
}

export function verifyAdmin(req, res, next) {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			next(customErrorHandler.unAuthorizedUser());
		}
	});
}
