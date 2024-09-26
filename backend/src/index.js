import express from "express";
import connectDB from "./database/connect.db.js";

//Creating an App
const app = express();

//Assigning a port
const PORT = process.env.PORT;

//To make app understand json data
app.use(express.json());

//Database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
