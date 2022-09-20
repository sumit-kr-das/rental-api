import BookingsSchema from "../../models/BookingsSchema.js";
import RoomSchema from "../../models/RoomSchema.js";

const bookingsController = {
	async getBookings(req, res, next) {
		try {
			const bookings = await BookingsSchema.find({ userID: req.user.id });
			res.status(200).json(bookings);
		} catch (err) {
			next(err);
		}
	},
	async removeBookings(req, res, next) {
		const bookingId = req.params.id;
		try {
			const findBooking = await BookingsSchema.findById(bookingId);
			try {
				await RoomSchema.updateOne(
					{ "roomNumbers._id": findBooking.roomId },
					{
						$pullAll: {
							"roomNumbers.$.unAavailableDates": req.body.dates,
						},
					}
				);
				try {
					await BookingsSchema.findByIdAndDelete(bookingId);
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
