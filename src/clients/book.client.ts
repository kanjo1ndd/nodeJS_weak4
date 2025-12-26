import axios from "axios";

const BOOK_API = "http://localhost:8080/api/book";

export async function checkBookExists(bookId: number): Promise<boolean> {
  try {
    await axios.get(`${BOOK_API}/${bookId}`);
    return true;
  } catch {
    return false;
  }
}