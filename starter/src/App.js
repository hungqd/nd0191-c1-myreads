import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import { getAll } from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BookList
        books={books}
        onBookUpdated={() => getBooks()}
      />
    },
    {
      path: '/search',
      element: <BookSearch currentBooks={books} />
    }
  ]);

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
