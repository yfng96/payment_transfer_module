import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';

export const WALLET = 'wallet';

export const getBalance = createAsyncThunk(
  `${WALLET}/getBalance`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/wallet-info');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  `${WALLET}/getTransactionHistory`,
  async (
    { length, start }: { length: number; start: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        '/api/transaction-history/list?length=' + length + '&start=' + start
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getRecentTransaction = createAsyncThunk(
  `${WALLET}/getRecentTransaction`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/transaction-history/recent');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getFavouriteRecipient = createAsyncThunk(
  `${WALLET}/getFavouriteRecipient`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/recipient/favourite');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getRecentRecipient = createAsyncThunk(
  `${WALLET}/getRecentRecipient`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/recipient/recent');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

