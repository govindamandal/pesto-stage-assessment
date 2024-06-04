import express from "express";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
