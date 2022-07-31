import RoomSchema from "../../models/RoomSchema.js";
import HotelSchema from "../../models/HotelSchema.js";

const roomController = {
	async createRoom(req, res, next) {
		const hotelId = req.params.hotelid;
		const newRoom = new RoomSchema(req.body);

		try {
			const savedRoom = await newRoom.save();
			try {
				await HotelSchema.findByIdAndUpdate(hotelId, {
					$push: { rooms: savedRoom._id },
				});
			} catch (err) {
				next(err);
			}
			res.status(200).json(savedRoom);
		} catch (err) {
			next(err);
		}
	},

	async updateRoom(req, res, next) {
		try {
			const updatedRoomData = await RoomSchema.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true }
			);
			res.status(200).json(updatedRoomData);
		} catch (err) {
			next(err);
		}
	},

	async deleteRoom(req, res, next) {
		const hotelId = req.params.hotelid;
		try {
			await RoomSchema.findByIdAndDelete(req.params.id);
			try {
				await HotelSchema.findByIdAndUpdate(hotelId, {
					$pull: { rooms: req.params.id },
				});
			} catch (err) {
				next(err);
			}
			res.status(200).json({ msg: "Hotel has been deleted" });
		} catch (err) {
			next(err);
		}
	},

	async getRoom(req, res, next) {
		try {
			const getSingleRoom = await RoomSchema.findById(req.params.id);
			res.status(200).json(getSingleRoom);
		} catch (err) {
			next(err);
		}
	},

	async getRooms(req, res, next) {
		try {
			const getAllRooms = await RoomSchema.find();
			res.status(200).json(getAllRooms);
		} catch (err) {
			next(err);
		}
	},

	async updateRoomAvailability(req, res, next) {
		try {
			await RoomSchema.updateOne(
				{ "roomNumbers._id": req.params.id },
				{
					$push: {
						"roomNumbers.$.unAavailableDates": req.body.dates,
					},
				}
			);
			res.status(200).json("Room has been updated");
		} catch (err) {
			next(err);
		}
	},
};

export default roomController;
