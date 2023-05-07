import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import logs from "./routes/logs.mjs";
import emails from "./routes/email.mjs";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5051;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser);

// Load the /posts routes
app.use("/logs", logs);
app.use("/send-email", emails);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});






 