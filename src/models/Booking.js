import mongoose from "mongoose";

const reqString = { type: String, required: true };

const BookingsSchema = new mongoose.Schema({
    userId: reqString,
    roomId: reqString,
    hotelId: reqString,
    title: reqString,
    price: reqString,
    options: { type: Object},
    address: reqString,
    reserveDates: { type: [ Date ]},
});


const Booking = mongoose.model("Booking", BookingsSchema, "bookings");
export default Booking;