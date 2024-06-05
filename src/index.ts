import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from "./routes";

import connectDatabse from "./mongo.db";

dotenv.config();
connectDatabse();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
