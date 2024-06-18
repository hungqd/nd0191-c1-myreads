import { shelf } from "./Constants";

export default function Book({ book }) {
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.thumbnail}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        {Object.entries(shelf).forEach(([key, value]) => {
                            <option value={key}>{value}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
    );
}