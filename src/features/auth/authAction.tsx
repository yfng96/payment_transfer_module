import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';

export const AUTH = 'auth';

export const login = createAsyncThunk(
  `${AUTH}/login`,
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/login', { email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
)
