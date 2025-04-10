import { createSlice } from '@reduxjs/toolkit';
import { getBalance, getRecentTransaction, getTransactionHistory, WALLET } from './walletAction';
import { TransactionHistoryResponse, WalletState } from '~/types';

const initialState: WalletState = {
  balance: {
    amount: 0,
    currency: 'MYR',
    loading: true,
  },
  transactionHistory: {
    list: [],
    loading: false,
    error: null,
    total: 0,
  },
  recentTransaction: {
    list: [],
    loading: false,
    error: null,
  },
  favouriteRecipient: {
    list: [{
      name: 'YF Hong Leong',
      type: 1,
      bankName: 'Hong Leong Bank',
      bankCode: 'HLB',
      accountNo: '2222222222'
    },
    {
      name: 'YF Cimb',
      type: 1,
      bankName: 'Alliance Bank',
      bankCode: 'ALLIANCE',
      accountNo: '2222222222'
    },
    {
      name: 'YF Mobile',
      type: 2,
      bankName: 'TNG Wallet',
      bankCode: 'TNG',
      accountNo: '60102222222'
    }],
    loading: false,
    error: null,
    total: 3,
  },
  recentRecipient: {
    list: [{
      name: 'YF Mobile',
      type: 2,
      bankName: 'TNG Wallet',
      bankCode: 'TNG',
      accountNo: '60102222222'
    }],
    loading: false,
    error: null,
    total: 1,
  }
};


export const walletSlice = createSlice({
  name: WALLET,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.balance.loading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        const { balance, currency } = action.payload;
        state.balance = {
          amount: balance,
          currency,
          loading: false,
        }
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.balance.loading = false;
      });
    builder
      .addCase(getTransactionHistory.pending, (state) => {
        state.transactionHistory.loading = true;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        const { data, total } = action.payload as TransactionHistoryResponse;
        state.transactionHistory.list = data;
        state.transactionHistory.total = total ?? 0;
        state.transactionHistory.loading = false;
      })
      .addCase(getTransactionHistory.rejected, (state, action) => {
        const { message } = action.payload as { message: string };
        state.transactionHistory.loading = false;
        state.transactionHistory.error = message;
      });
    builder
      .addCase(getRecentTransaction.pending, (state) => {
        state.recentTransaction.loading = true;
      })
      .addCase(getRecentTransaction.fulfilled, (state, action) => {
        const { data } = action.payload as TransactionHistoryResponse;
        state.recentTransaction.list = data;
        state.recentTransaction.loading = false;
      })
      .addCase(getRecentTransaction.rejected, (state, action) => {
        const { message } = action.payload as { message: string };
        state.recentTransaction.loading = false;
        state.recentTransaction.error = message;
      });
  },

});

export const { } = walletSlice.actions;
export default walletSlice.reducer;
