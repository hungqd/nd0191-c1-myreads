import { update } from "./BooksAPI";
import { shelf } from "./Constants";

export default function Book({ book, onUpdated }) {

    function onChangeShelf(event) {
        const shelf = event.target.value;
        update(book, shelf).then((res) => {
            console.log("Book updated. " + JSON.stringify(res));
            if (onUpdated) {
                onUpdated(shelf);
            }
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
                        backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : null}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf ? book.shelf : 'none'} onChange={onChangeShelf}>
                        <option disabled>
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
            <div className="book-authors">{book.authors ? book.authors.join("; ") : null}</div>
        </div>
    );
}