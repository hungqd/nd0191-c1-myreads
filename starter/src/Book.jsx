import { update } from "./BooksAPI";
import { shelf } from "./Constants";

export default function Book({ book }) {

    function onChangeShelf(event) {
        const shelf = event.target.value;
        update(book, shelf).then((res) => {
            console.log("Book updated. " + JSON.stringify(res));
        });
    }

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={onChangeShelf}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        {Object.entries(shelf).map(([key, value]) => {
                            return (
                                <option
                                    key={key}
                                    value={key}
                                    disabled={key === book.shelf}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join("; ")}</div>
        </div>
    );
}