import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../store/bookSlice";

const BooksList = ({ isLoading, books , isLoggedIn }) => {
  const dispatch = useDispatch();

  const allBooks = books.map((book) => (
    <li className="list-group-item d-flex  justify-content-between align-items-center" key={book.id}>
      <div>{book.title}</div>
      <div className="btn-group" role="group">
        <button onClick={() => dispatch(getBook(book.id))} type="button" className="btn btn-primary">
          Read
        </button>
        <button type="button" className="btn btn-danger" onClick={() =>
           dispatch(deleteBook(book))
           .unwrap()
           .then((originalPromiseResult) => {
               console.log(originalPromiseResult);
           })
           .catch((rejectedValueOrSerializedError) => {
               console.log(rejectedValueOrSerializedError);
           })
           } disabled={!isLoggedIn}>
          Delete
        </button>
      </div>
    </li>
  ));

  return (
    <div>
      <h2>Books List</h2>
      {books.length > 0 ? (
        isLoading ? "loading..." : <ul className="list-group">{allBooks}</ul>
      ): (
        <h4 className="text-danger">there is no books</h4>
      )}
    </div>
  );
};

export default BooksList;
