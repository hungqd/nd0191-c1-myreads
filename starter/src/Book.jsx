import { update } from "./BooksAPI";
import { allShelfes } from "./Constants";

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

    const shelf = book.shelf ? book.shelf : 'none';

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
                    <select value={shelf} onChange={onChangeShelf}>
                        <option disabled>
                            Move to...
                        </option>
                        {Object.entries(allShelfes).map(([key, value]) => {
                            return (
                                <option
                                    key={key}
                                    value={key}
                                    disabled={key === shelf}>
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