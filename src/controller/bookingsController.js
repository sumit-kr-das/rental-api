import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

const bookingsController = {
  async getBookings(req, res, next) {
    try {
      const bookings = await Booking.find({ userId: req.user.id });
      res.status(200).json(bookings);
    } catch (err) {
      next(err);
    }
  },
  async removeBookings(req, res, next) {
    const bookingId = req.params.id;
    try {
      const findBooking = await Booking.findById(bookingId);
      try {
        await Room.updateOne(
          { "roomNumbers._id": findBooking.roomId },
          {
            $pullAll: {
              "roomNumbers.$.unAavailableDates": req.body.dates,
            },
          }
        );
        try {
          await Booking.findByIdAndDelete(bookingId);
          res.status(200).json("Hotel remove siccessfully");
        } catch (err) {
          next(err);
        }
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  },
};

export default bookingsController;
