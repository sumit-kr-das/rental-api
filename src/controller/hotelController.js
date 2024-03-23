import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import fs from "fs";
import plimit from "p-limit";
import { destroyOnCloudnary, uploadOnCloudnary } from "../utils/cloudnary.js";

const limit = plimit(5);

const hotelController = {
  async setHotel(req, res, next) {
    const {
      title,
      type,
      city,
      address,
      distance,
      description,
      rating,
      cheapestPrice,
      featured,
      freeTaxi,
      freeCancel,
    } = req.body;

    let filePaths;
    if (req.files) {
      const cloudnaryUploadedImages = req.files.map((image) => {
        return limit(async () => {
          const cloudnaryResult = await uploadOnCloudnary(image.path);
          return cloudnaryResult;
        });
      });
      const cloudnaryUploads = await Promise.all(cloudnaryUploadedImages);
      filePaths = cloudnaryUploads.map((item) => item.url);

      req.files?.map((image) => {
        fs.unlinkSync(image.path);
      });
    }

    try {
      const createHotel = new Hotel({
        userId: req.user.id,
        title,
        type,
        city,
        address,
        distance,
        description,
        rating,
        cheapestPrice,
        featured,
        freeTaxi,
        freeCancel,
        photos: filePaths,
      });
      const savedHotel = await createHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      req.files?.map((image) => {
        fs.unlinkSync(image.path);
      });
      next(err);
    }
  },

  async updateHotel(req, res, next) {
    try {
      const user = await Hotel.findOne({ userId: req.user.id });
      if (!user) {
        return res.status(401).json({
          msg: "Hotel not found!",
        });
      }
      const {
        userId,
        title,
        type,
        city,
        address,
        distance,
        description,
        rating,
        cheapestPrice,
        featured,
        freeTaxi,
        freeCancel,
      } = req.body;

      let filePaths;
      if (req.files.length > 0) {
        /* if image is already available the delete the images */
        if (user.photos.length > 0) {
          const removeUploadedImages = user.photos.map((url) => {
            return limit(async () => {
              const urlArray = url.split("/");
              const uurl = urlArray[urlArray.length - 1];
              const imgName = uurl.split(".")[0];
              const resultUploadedImages = await destroyOnCloudnary(imgName);
              return resultUploadedImages;
            });
          });
          // if (!removeUploadedImages) {
          //   return res.status(404).json({
          //     message: "User image is not found in cloudnary",
          //   });
          // }
          const newUploadedImages = await Promise.all(removeUploadedImages);
          console.log("from update", newUploadedImages);
          console.log("Image is deleted from cloudnary");
        }

        /* insert new images */
        const cloudnaryUploadedImages = req.files.map((image) => {
          return limit(async () => {
            const cloudnaryResult = await uploadOnCloudnary(image.path);
            return cloudnaryResult;
          });
        });
        const cloudnaryUploads = await Promise.all(cloudnaryUploadedImages);
        filePaths = cloudnaryUploads.map((item) => item.url);

        req.files?.map((image) => {
          fs.unlinkSync(image.path);
        });
      }

      const updateHotel = {
        userId,
        title,
        type,
        city,
        address,
        distance,
        description,
        rating,
        cheapestPrice,
        featured,
        freeTaxi,
        freeCancel,
        ...(req.files && { photos: filePaths }),
      };

      const updatedHotelData = await Hotel.findOneAndUpdate(
        { _id: user._id },
        updateHotel,
        { new: true }
      );
      res.status(200).json(updatedHotelData);
    } catch (err) {
      next(err);
    }
  },

  async deleteHotel(req, res, next) {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Hotel has been deleted" });
    } catch (err) {
      next(err);
    }
  },

  async getHotel(req, res, next) {
    try {
      const getSingleHotel = await Hotel.findById(req.params.id);
      res.status(200).json(getSingleHotel);
    } catch (err) {
      next(err);
    }
  },

  async getUsersHotel(req, res, next) {
    try {
      const getSingleHotel = await Hotel.find({ userId: req.user.id });
      res.status(200).json(getSingleHotel);
    } catch (err) {
      next(err);
    }
  },

  async getHotels(req, res, next) {
    const { min, max, ...others } = req.query;
    try {
      const getAllHotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 9999 },
      }).limit(req.query.limit);

      // const getAllHotels = await Hotel.find()

      res.status(200).json(getAllHotels);
    } catch (err) {
      next(err);
    }
  },

  async countByCity(req, res, next) {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },

  async countByType(req, res, next) {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotels" });
      const apartmentCount = await Hotel.countDocuments({
        type: "apartments",
      });
      const resortCount = await Hotel.countDocuments({ type: "resorts" });
      const villaCount = await Hotel.countDocuments({ type: "villas" });
      const cabinCount = await Hotel.countDocuments({ type: "cabins" });

      res.status(200).json([
        { type: "hotels", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  },

  async getHotelRooms(req, res, next) {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },

  async searchHotel(req, res, next) {
    const regex = new RegExp(req.params.place, "i");
    try {
      const result = await Hotel.find({ city: regex })
        .select({ city: 1 })
        .limit(5);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};

export default hotelController;
