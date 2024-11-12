import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      bookData.author = getState().auth.author;
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
     await fetch(`http://localhost:5000/books/${book.id}`, {
        method: "DELETE",
      });
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (bookId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
     await fetch(`http://localhost:5000/books/${bookId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
     });
      return bookId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null , bookInfo: null },
  // reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // console.log(action);
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        // console.log(action.payload);
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log(action);
      })
      .addCase(insertBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // console.log(action);
      })
      .addCase(insertBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.push(action.payload);
        // console.log(action);
      })
      .addCase(insertBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log(action);
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // console.log(action);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter(
          (prev) => prev.id !== action.payload.id
        );
        // console.log(action);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log(action);
      })
      .addCase(getBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // console.log(action);
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookInfo = state.books.find((prev) => prev.id === action.payload);
  
        // console.log(action);
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log(action);
      });
  },
});

export default bookSlice.reducer;
