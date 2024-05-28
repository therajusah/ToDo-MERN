const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./connection/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");
const path = require("path");
const app = express();
const port = process.env.PORT || 1000;

app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve static files from the 'dist' directory
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

// Catch-all route to serve the frontend's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB, server not started", error);
  });
