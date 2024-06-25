import Shelf from "./Shelf";

export default function BookList({ books, onAddBook }) {

    const currentlyReading = books.filter((b) => b.shelf === "currentlyReading");
    const wantToRead = books.filter((b) => b.shelf === "wantToRead");
    const read = books.filter((b) => b.shelf === "read");

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        currentlyReading.length > 0 && <Shelf
                            name={'currentlyReading'}
                            books={currentlyReading}
                        />
                    }
                    {
                        wantToRead.length > 0 && <Shelf
                            name={'wantToRead'}
                            books={wantToRead}
                        />
                    }
                    {
                        read.length > 0 && <Shelf
                            name={'read'}
                            books={read}
                        />
                    }
                </div>
                <div className="open-search">
                    <a href="!#" onClick={onAddBook}>Add a book</a>
                </div>
            </div>
        </div>
    );
}