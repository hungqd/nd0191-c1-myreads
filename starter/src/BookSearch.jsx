import { useState } from "react";
import { search } from "./BooksAPI";
import Book from "./Book";


export default function BookSearch({ onClose }) {

    const [books, setBooks] = useState([]);

    function onSearch(event) {
        const query = event.target.value.trim();
        if (query.length > 0) {
            search(query, 10).then((books) => {
                setBooks(books);
            });
        } else {
            setBooks([]);
        }
    }

    function onBookUpdated(book, shelf) {
        setBooks(books.map((b) => {
            return b.id === book.id ? Object.assign({}, b, { shelf }) : b;
        }));
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    href="!#"
                    className="close-search"
                    onClick={onClose}
                >
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={onSearch}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map((book) => {
                        return (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onUpdated={(shelf) => onBookUpdated(book, shelf)}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}