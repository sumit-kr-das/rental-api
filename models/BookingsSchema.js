import mongoose from "mongoose";

const BookingsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    hotelId: { type: String, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    reserveDates: { type: [ Date ]},
    price: { type: Number }
});

export default mongoose.model("Booking", BookingsSchema, "bookings");