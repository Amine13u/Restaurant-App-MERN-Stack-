const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/product", require("./routes/api/product"));
app.use("/api/order", require("./routes/api/order"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
