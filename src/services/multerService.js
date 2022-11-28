import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "public/assets/"),
	filename: (req, file, cb) => {
		const uniqueName = `${Date.now()} - ${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;

		cb(null, uniqueName);
	},
});

const fileFilter = (req, file, callback) => {
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg"
	) {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

const fileUpload = multer({
	storage,
    fileFilter,
	limits: { fileSize: 1000000 * 5 },
});


export default fileUpload;