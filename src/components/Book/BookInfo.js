import React from 'react';

const BookInfo = ({book}) => {

  
  return (
    <>
      <h2>Book Details</h2>
      
      {book ? (
        <div>
        <p className='fw-bold'>Title: {book.title}</p>
        <p className='fw-bold'>Inserted By: {book.author}</p>
        <p className='fw-light'>Description: {book.description}</p>
        <p className='fst-italic'>Price: {book.price}</p>
      </div>
      ): (
        <div className='alert alert-secondary' role='alert'>
        There is no book selected yet. Please select!
      </div>
      )}
    </>
  );
};

export default BookInfo;
