import mongoose from "mongoose";

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };

const RoomSchema = new mongoose.Schema(
  {
    // hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotels" },
    title: reqString,
    price: reqNumber,
    beds: reqNumber,
    maxPeople: reqNumber,
    area: { type: Number },
    desc: reqString,
    roomNumbers: [{ number: Number, unAavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

/*
    [
        { number: 101, unAavailableDates: [01.02.2022, 04.02,2022] }
        { number: 102, unAavailableDates: [] }
        { number: 103, unAavailableDates: [] }
    ]
*/

const Room = mongoose.model("Rooms", RoomSchema, "rooms");
export default Room;
