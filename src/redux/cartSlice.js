// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('cart/fetchBooks', async () => {
  try {
    const response = await axios.get('https://bookcart.azurewebsites.net/api/book/');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
