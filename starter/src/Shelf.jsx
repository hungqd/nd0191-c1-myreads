import Book from "./Book";
import { allShelfes } from "./Constants";

export default function Shelf({ name, books, onBookUpdated }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{allShelfes[name]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} onUpdated={onBookUpdated} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}