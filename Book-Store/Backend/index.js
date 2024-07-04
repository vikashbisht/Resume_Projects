import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";

const app = express();
app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

//connect to MongoDB
try {
  mongoose.connect(uri);
  console.log("MongoDB connected");
} catch (error) {
  console.log("Error connecting to MongoDB");
}

//middleware
app.use(express.json());

//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
