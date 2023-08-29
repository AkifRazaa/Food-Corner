
const express = require("express");
const app = express();
const MongoDB = require("./db");
MongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route to handle CORS preflight requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Rest of your routes and middleware
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api/auth", require("./Routes/OrderData"));

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});

