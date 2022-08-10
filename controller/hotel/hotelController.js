import HotelSchema from "../../models/HotelSchema.js";
import RoomSchema from "../../models/RoomSchema.js";

const hotelController = {
    async setHotel(req,res,next) {
        const newHotel = new HotelSchema(req.body);
        try{
            const savedHotel = await newHotel.save();
            res.status(200).json(savedHotel);
        }catch(err) {
            next(err);
        }
    },
    
    async updateHotel(req,res,next) {
        try{
            const updatedHotelData = await HotelSchema.findByIdAndUpdate(req.params.id, 
                { $set: req.body }, { new: true }
            );
            res.status(200).json(updatedHotelData);
        }catch(err) {
            next(err);
        }
    },

    async deleteHotel(req,res,next) {
        try{
            await HotelSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Hotel has been deleted"});
        }catch(err) {
            next(err);
        }
    },

    async getHotel(req,res,next) {
        try{
            const getSingleHotel = await HotelSchema.findById(req.params.id);
            res.status(200).json(getSingleHotel);
        }catch(err) {
            next(err);
        }
    },

    async getHotels(req,res,next) {
        const { min, max, ...others } = req.query; 
        try{
            const getAllHotels = await HotelSchema.find({
                ...others,
                cheapestPrice: { $gt: min | 1, $lt: max || 999 },
            }).limit(req.query.limit);

            res.status(200).json(getAllHotels);
        }catch(err) {
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
				{ type: "hotels", count: hotelCount },
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
}

export default hotelController;