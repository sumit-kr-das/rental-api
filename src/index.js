import express from "express";
import cors from "cors";
import connection from "./utils/connection.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { ORIGIN, PORT } from "./config/index.js";

import testRoutes from "./routes/test.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import hotelRoutes from "./routes/hotel.js";
import roomRoutes from "./routes/rooms.js";
import newsRoutes from "./routes/newsletter.js";
import bookingRoutes from "./routes/bookings.js";

const app = express();

/* MIDDLEWARES */
app.use(
  cors({
    origin: [`${ORIGIN}`],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/api/v1", testRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hotel", hotelRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/newsLetter", newsRoutes);

/* ERROR HANDLER */
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Listening on port no ${PORT}`);
  await connection();
});
