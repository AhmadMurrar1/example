import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController.js";

const router = express.Router();

// Route to get all books
router.get("/", getAllBooks);

// Route to get a single book by ID
router.get("/:id", getBookById);

// Route to create a new book
router.post("/", createBook);

// Route to update an existing book
router.put("/:id", updateBook);

// Route to delete a book
router.delete("/:id", deleteBook);

export default router;
