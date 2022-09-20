import mongoose from "mongoose";

const BookingsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    reserveDates: { type: [ Date ]},
    price: { type: Number }
});

export default mongoose.model("Booking", BookingsSchema, "bookings");