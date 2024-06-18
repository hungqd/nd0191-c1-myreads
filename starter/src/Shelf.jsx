import Book from "./Book";
import { shelf } from "./Constants";

export default function Shelf({ name, books }) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf[name]}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.forEach((book) => {
                        <li>
                            <Book book={book} />
                        </li>
                    })}
                </ol>
            </div>
        </div>
    );
}