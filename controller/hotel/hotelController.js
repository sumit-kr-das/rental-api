import HotelSchema from "../../models/HotelSchema";

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
    }
}

export default hotelController;