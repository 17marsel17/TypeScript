import express from "express";
import { storage, fileFilter } from "../middleware/file.js";
import multer from "multer";
import { BookController } from "../Books/BookController";

export const router = express.Router();

const bookController: BookController = new BookController();

router.get(":id/download", bookController.downloadBook);

router.get("/:id", bookController.getBook);

router.get("/", bookController.getBooks);

router.post(
  "/",
  multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: "fileCover", maxCount: 1 },
    { name: "fileBook", maxCount: 1 },
  ]),
  bookController.createBook
);

router.put(
  "/:id",
  multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: "fileCover", maxCount: 1 },
    { name: "fileBook", maxCount: 1 },
  ]),
  bookController.updateBook
);

router.delete("/:id", bookController.deleteBook);
