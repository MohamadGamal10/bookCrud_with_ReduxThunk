import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBook } from '../store/bookSlice';

const Addform = () => {
  const dispatch = useDispatch();
  const title = useRef();
  const price = useRef();
  const desc = useRef();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      title: title.current.value,
      price: price.current.value,
      description: desc.current.value,
    };
    // console.log(bookData);
    dispatch(insertBook(bookData));
    title.current.value = '';
    price.current.value = '';
    desc.current.value = '';
  };
  
  return (
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit} >
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input ref={title} type='text' className='form-control' id='title' required />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input ref={price} type='number' className='form-control' id='price' required />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
            ref={desc}
              className='form-control'
              id='Description'
              rows='3'
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary' disabled={!isLoggedIn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
