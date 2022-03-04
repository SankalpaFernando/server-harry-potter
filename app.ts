import express, { Application } from "express";
import bodyParser from "body-parser";
import router from "./route";
import cors from "cors"

const app: Application = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const PORT =  process.env.PORT || 5000;

app.listen(PORT, (): void => {
  console.log(`Server Started at PORT ${PORT}`);
});
