const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/conn");
const auth = require("./routes/auth");
const list = require("./modals/list");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
  console.log("server Started on port 1000");
});
