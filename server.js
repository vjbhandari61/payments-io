require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes/index");
const {connectDB} = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT}`)
})