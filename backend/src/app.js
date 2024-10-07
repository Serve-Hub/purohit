import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


//To make app understand json data
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//routes import

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
export default app;
