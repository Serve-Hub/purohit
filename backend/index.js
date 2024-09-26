import express from "express";

//Creating an App
const app = express();

//Assigning a port
const PORT = process.env.PORT;

//To make app understand json data
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
