import STATUS_CODE from "../constants/statusCodes.js";
import { readBooksFromFile, writeBooksToFile } from "../models/bookModel.js";
import { v4 as uuidv4 } from "uuid";

// @des      Get all the books
// @route    GET /api/v1/books
// @access   Public
export const getAllBooks = async (req, res, next) => {
  try {
    const books = readBooksFromFile();
    res.send(books);
  } catch (error) {
    next(error);
  }
};

// @des      Get a single book
// @route    GET /api/v1/books/:id
// @access   Public
export const getBookById = async (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const book = books.find((b) => b.id === req.params.id);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book was not found");
    }
    res.send(book);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};


// @des      Create a book
// @route    POST /api/v1/books
// @access   Public
export const createBook = async (req, res, next) => {
  try {
    const { title, author, genre, pages, publishedIn, reviews, description, coverImage, price, averageRating, readingProgress } = req.body;
    // Validating required fields
    if (!title || !author || !genre || !pages || !publishedIn || !reviews || !description || !coverImage || !price || !averageRating || !readingProgress) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All fields (title, author, genre, pages, publishedIn, reviews, description, coverImage, price, averageRating, readingProgress) are required"
      );
    }

    const books = readBooksFromFile();
    if (books.some((b) => b.title === title)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("A book with the same title already exists");
    }

    // Generate a unique ID using uuidv4()
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      pages,
      publishedIn,
      reviews,
      description,
      coverImage,
      price,
      averageRating,
      readingProgress
    };

    books.push(newBook);
    writeBooksToFile(books);
    res.status(STATUS_CODE.CREATED).send(newBook);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};


// @des      Update a book
// @route    PUT /api/v1/books/:id
// @access   Public
export const updateBook = async (req, res, next) => {
  try {
    const { id: bookId, ...updatedFields } = req.body;

    const books = readBooksFromFile();
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book was not found!");
    }

    const updatedBook = { ...books[index], ...updatedFields };
    books[index] = updatedBook;
    writeBooksToFile(books);
    res.send(updatedBook);
  } catch (error) {
    next(error);
  }
};



// @des      delete a book
// @route    DELETE /api/v1/books/:id
// @access   Public
export const deleteBook = async (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const bookIndex = books.findIndex((book) => book.id === req.params.id);

    if (bookIndex === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book was not found");
    }

    books.splice(bookIndex, 1);
    writeBooksToFile(books);
    res.status(STATUS_CODE.OK).send(`Book with the id of ${req.params.id} was deleted!`);
  } catch (error) {
    next(error);
  }
};

