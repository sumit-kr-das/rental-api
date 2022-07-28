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
	async countByCity(req, res, next) {
		const cities = req.query.cities.split(",")
		try {
			const list = await Promise.all(cities.map(city => {
				return HotelSchema.countDocuments({ city: city })
			}))
			res.status(200).json(list);
		} catch (err) {
			next(err);
		}
	},
	async countByType(req, res, next) {
		try {
			const hotelCount = await HotelSchema.countDocuments({ type: "hotel" });
			const apartmentCount = await HotelSchema.countDocuments({ type: "apartment" });
			const resortCount = await HotelSchema.countDocuments({ type: "resort" });
			const villaCount = await HotelSchema.countDocuments({ type: "villa" });
			const cabinCount = await HotelSchema.countDocuments({ type: "cabin" });
			
			res.status(200).json([
				{ type: "hotel", count: hotelCount },
				{ type: "apartments", count: apartmentCount },
				{ type: "resorts", count: resortCount },
				{ type: "villas", count: villaCount },
				{ type: "cabins", count: cabinCount },
			  ])
		} catch (err) {
			next(err);
		}
	},
	async getHotelRooms(req,res,next){
		try{
			const hotel = await HotelSchema.findById(req.params.id)
			const list = await Promise.all(hotel.rooms.map(room => {
				return RoomSchema.findById(room)
			}));
			res.status(200).json(list);
		}catch(err){
			next(err);
		}
	}
};

export default roomController;
