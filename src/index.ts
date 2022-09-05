import express from "express";
import { PORT, MONGO_URL } from "./config";
import { router as booksRouter } from "./routes/bookRouter";
import { logger } from "./middleware/logger";
import morgan from "morgan";
import { error } from "./middleware/error";
import mongoose from "mongoose";
import * as path from "path";

mongoose.connect(MONGO_URL).then(() => {
  console.log(`Connected to ${MONGO_URL}`);
});

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use("/load", express.static(path.join(__dirname, "..", "load")));
app.use(express.static("public"));

app.use(morgan("dev"));
app.use(logger);

app.use("/api/books", booksRouter);

app.use(error);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
