import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./middlewares/passport.js";
import session from "express-session";

const app = express();

//To make app understand json data
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//routes import

// app.use("/",(req,res)=>{
//   res.send("welcome to purohit backend")
// })

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export default app;
