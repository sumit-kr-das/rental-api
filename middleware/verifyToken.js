import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import customErrorHandler from "../services/customErrorHandler.js";

export function verifyToken(req, res, next) {
	const token = req.cookies.access_token;

	if (!token) {
		return next(customErrorHandler.unAuthorizedUser());
	}
	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return next(customErrorHandler.unAuthorizedUser());
		}
		req.user = user;
		next();
	});
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