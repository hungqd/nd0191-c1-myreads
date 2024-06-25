import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import "./App.css";
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import { getAll } from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  function getBooks() {
    getAll().then((data) => {
      setBooks(data);
    }).catch((error) => {
      console.log("Get books error: " + error);
    });
  }

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      getBooks();
    }
  }, [location]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<BookList
            books={books}
            onBookUpdated={() => getBooks()}
          />} />
        <Route
          path="/search"
          element={<BookSearch currentBooks={books} />} />
      </Routes>
    </div>
  );
}

export default App;
