import { useEffect, useState } from "react";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Book from "./Book";
import { search } from "./BooksAPI";

export default function BookSearch({ currentBooks, onClose }) {

    const [books, setBooks] = useState([]);

    const querySubject = new Subject();

    const [bookShelf, setBookShelf] = useState(currentBooks.reduce((map, book) => {
        map[book.id] = book.shelf;
        return map;
    }, {}));

    useEffect(() => {
        querySubject.pipe(debounceTime(300)).subscribe((value) => {
            if (value.length <= 0) {
                setBooks([]);
                return;
            }
            search(value, 10).then((books) => {
                setBooks(books.map((book) => {
                    return Object.assign({}, book, { shelf: bookShelf[book.id] });
                }));
            }).catch((e) => {
                console.log('Search error', e);
                setBooks([]);
            });
        });
        return () => {
            querySubject.complete();
        }
    });

    function onSearch(event) {
        const query = event.target.value.trim();
        querySubject.next(query);
    }

    function onBookUpdated(book, shelf) {
        setBookShelf(Object.assign({}, bookShelf, { [book.id]: shelf }));
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