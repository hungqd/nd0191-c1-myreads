import { useEffect, useState } from "react";
import "./App.css";
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import { getAll } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  function getBooks() {
    getAll().then((data) => {
      setBooks(data);
    }).catch((error) => {
      console.log("Get books error: " + error);
    });
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <BookSearch currentBooks={books} onClose={() => {
          getBooks();
          setShowSearchpage(false)
        }} />
      ) : (
        <BookList books={books} onAddBook={() => {
          setShowSearchpage(true);
        }}
          onBookUpdated={() => getBooks()} />
      )}
    </div>
  );
}

export default App;
