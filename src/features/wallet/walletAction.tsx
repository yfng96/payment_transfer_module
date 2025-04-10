import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const WALLET = 'wallet';

export const getBalance = createAsyncThunk(
  `${WALLET}/getBalance`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/wallet-info');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getTransactionHistory = createAsyncThunk(
  `${WALLET}/getTransactionHistory`,
  async ({ length, start }: { length: number, start: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/transaction-history/list?length=' + length + '&start=' + start);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getRecentTransaction = createAsyncThunk(
  `${WALLET}/getRecentTransaction`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/transaction-history/recent');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)
