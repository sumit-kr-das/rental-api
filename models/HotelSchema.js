import mongoose from "mongoose";

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqArray = { type: [String] };
const reqBool = { type: Boolean, default: false };
const reqRating = { type: Number, min: 0, max: 5 };

const HotelSchema = new mongoose.Schema({
	type: reqString,
	city: reqString,
	address: reqString,
	distance: reqString,
	photos: reqArray,
	description: reqString,
	title: reqString,
	rating: reqRating,
	rooms: reqArray,
	cheapestPrice: reqNumber,
	featured: reqBool,
    freeTaxi: reqBool,
    freeCancel: reqBool,
});

export default mongoose.model("Hotel", HotelSchema, "hotels");
