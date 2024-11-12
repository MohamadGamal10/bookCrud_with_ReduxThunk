import React, { useEffect } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { useDispatch, useSelector } from 'react-redux';
import './book.css';
import { getBooks } from '../../store/bookSlice';


const PostContainer = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.books.isLoading);
  const allbooks = useSelector((state) => state.books.books);
  const book = useSelector((state) => state.books.bookInfo);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} books={allbooks} isLoggedIn={isLoggedIn}/>
        </div>
        <div className='col side-line'>
          <BookInfo book={book} />
        </div>
      </div>
    </>
  );
};

export default PostContainer;
