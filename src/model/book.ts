import mongoose from "mongoose";
import { IBook } from "../interface/IBook";

const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  authors: { type: String, default: "" },
  favorite: { type: String, default: "" },
  fileCover: { type: Object, required: true },
  fileBook: { type: Object, required: true },
});

export const bookModel = model<IBook & Document>("Book", bookSchema);
