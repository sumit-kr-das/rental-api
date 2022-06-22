import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    roomNumbers: [{ number: Number, unAavailableDates: { type: [ Date ]} }],
}, { timestamps: true });

/*
    [
        { number: 101, unAavailableDates: [01.02.2022, 04.02,2022] }
        { number: 102, unAavailableDates: [] }
        { number: 103, unAavailableDates: [] }
    ]
*/

export default mongoose.model("Room", RoomSchema, "rooms");