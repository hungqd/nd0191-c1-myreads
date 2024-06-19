import "./App.css";
import { useState } from "react";
import BookList from "./BookList";
import BookSearch from "./BookSearch";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <BookSearch onClose={() => setShowSearchpage(false)} />
      ) : (
        <BookList onAddBook={() => {
          setShowSearchpage(true);
        }} />
      )}
    </div>
  );
}

export default App;
