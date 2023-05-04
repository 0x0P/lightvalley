import express from "express";
import index from "./routes";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

dotenv.config({ path: "../.env" });

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", index);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
