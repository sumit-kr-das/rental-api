import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";

const roomController = {
  async createRoom(req, res, next) {
    try {
      const findHotel = await Hotel.findOne({ userId: req.user.id });
      const newRoom = new Room(req.body);
      const savedRoom = await newRoom.save();

      try {
        await Hotel.findByIdAndUpdate(findHotel._id, {
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
      const updatedRoomData = await Room.findByIdAndUpdate(
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
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
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
      const getSingleRoom = await Room.findById(req.params.id);
      res.status(200).json(getSingleRoom);
    } catch (err) {
      next(err);
    }
  },

  async getRooms(req, res, next) {
    try {
      const getAllRooms = await Room.find();
      res.status(200).json(getAllRooms);
    } catch (err) {
      next(err);
    }
  },

  async updateRoomAvailability(req, res, next) {
    const userID = req.user.id;
    const roomID = req.params.roomId;

    try {
      const roomUpdateResponse = await Room.updateOne(
        { "roomNumbers._id": roomID },
        {
          $push: {
            "roomNumbers.$.unAavailableDates": req.body.dates,
          },
        }
      );
      let bookedRoom;
      if (roomUpdateResponse.modifiedCount > 0) {
        const newBooking = new Booking({
          userId: userID,
          roomId: roomID,
          hotelId: req.body.hotelId,
          title: req.body.title,
          address: req.body.address,
          reserveDates: req.body.dates,
          options: req.body.options,
          price: req.body.totalPrice,
        });
        bookedRoom = await newBooking.save();
      }
      res.status(200).json(bookedRoom);
    } catch (err) {
      next(err);
    }
  },

  // async findRoomsByHotel(req, res, next) {
  //   try {
  //     const rooms = await Room.find({ hotel: hotelId }).exec();
  //     res.status(200).json(rooms);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};

export default roomController;
