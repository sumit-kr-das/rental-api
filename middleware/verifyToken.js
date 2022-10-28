import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import customErrorHandler from "../services/customErrorHandler.js";

export async function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return next(customErrorHandler.unAuthorizedUser());
	}

	const token = authHeader.split(" ")[1];

	try{
		await jwt.verify(token, JWT_SECRET, (err, user) => {
			if (err) {
				return next(customErrorHandler.unAuthorizedUser());
			}
			req.user = user;
			next();
		});
	}catch(err){
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
		if (req.user && req.user.isAdmin) {
			next();
		} else {
			next(customErrorHandler.unAuthorizedUser());
		}
	});
}
