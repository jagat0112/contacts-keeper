const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

var cors = require("cors");

app.use(cors());

connectDB();

// Init Midddleware
app.use(express.json({ extended: false }));

const login = require("./routes/login");

app.use("/login", login);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
