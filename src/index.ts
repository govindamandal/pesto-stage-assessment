import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from 'dotenv';
import listRouter from "./routes/list.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use(listRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
