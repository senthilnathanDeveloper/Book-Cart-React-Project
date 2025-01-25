import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Mock token for demonstration. Replace with a dynamic token as needed.
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXZ5YSIsInVzZXJpZCI6IjQ1NDIiLCJ1c2VyVHlwZUlkIjoiMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjIiLCJqdGkiOiI5ZTY0NTcwYy1lMGM1LTQ2OWMtODlkYy0wMDQzNjA4ZmEwNGYiLCJleHAiOjE3MzczOTgyMjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY0LyJ9._8h_jSxcAe964aKrS6oqF6JPF0-qtYD73aUTZge6B6g';

// Register User API
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://bookcart.azurewebsites.net/api/user/', userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Validate Username API
export const validateUserName = createAsyncThunk(
  'user/validateUserName',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://bookcart.azurewebsites.net/api/user/validateUserName/${username}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Login API
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://bookcart.azurewebsites.net/api/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // API response (e.g., token, user info)
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    success: false,
    isUsernameValid: null,
    token: null,
    userInfo: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.isUsernameValid = null;
      state.token = null;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Validate Username
      .addCase(validateUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.isUsernameValid = action.payload;
      })
      .addCase(validateUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Save token from API response
        state.userInfo = action.payload.user; // Save user info from API response
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
