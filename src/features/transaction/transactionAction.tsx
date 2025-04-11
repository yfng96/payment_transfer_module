import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const TRANSACTION = 'transaction';

export const createTransfer = createAsyncThunk(
  `${TRANSACTION}/createTransfer`,
  async (
    {
      accNo,
      accType,
      bankCode,
      reference,
      amount,
    }: {
      accNo: string;
      accType: number;
      bankCode: string;
      reference: string;
      amount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/transfer', {
        accNo,
        accType,
        bankCode,
        reference,
        amount,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);