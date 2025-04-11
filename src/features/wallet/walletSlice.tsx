import { createSlice } from '@reduxjs/toolkit';
import { getBalance, getFavouriteRecipient, getRecentRecipient, getRecentTransaction, getTransactionHistory, WALLET } from './walletAction';
import { RecipientListResponse, TransactionHistoryResponse, WalletState } from '~/types';

const initialState: WalletState = {
  initialLoaded: false,
  balance: {
    amount: 0,
    currency: 'MYR',
    loading: true,
  },
  transactionHistory: {
    list: [],
    loading: false,
    total: 0,
  },
  recentTransaction: {
    list: [],
    loading: false,
  },
  favouriteRecipient: {
    list: [],
    loading: false,
    total: 0,
  },
  recentRecipient: {
    list: [],
    loading: false,
    total: 0,
  }
};


export const walletSlice = createSlice({
  name: WALLET,
  initialState,
  reducers: {
    finishInitialLoad: (state) => {
      state.initialLoaded = true;
    },
    updateBalance: (state, action) => {
      state.balance.amount += action.payload;
    }
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

        if (!state.initialLoaded) {
          state.initialLoaded = true;
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
        state.transactionHistory.loading = false;
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
        state.recentTransaction.loading = false;
      });
    builder
      .addCase(getFavouriteRecipient.pending, (state) => {
        state.favouriteRecipient.loading = true;
      })
      .addCase(getFavouriteRecipient.fulfilled, (state, action) => {
        const { data } = action.payload as RecipientListResponse;
        state.favouriteRecipient.list = data;
        state.favouriteRecipient.total = data.length;
        state.favouriteRecipient.loading = false;
      })
      .addCase(getFavouriteRecipient.rejected, (state, action) => {
        state.favouriteRecipient.loading = false;
      });
    builder
      .addCase(getRecentRecipient.pending, (state) => {
        state.recentRecipient.loading = true;
      })
      .addCase(getRecentRecipient.fulfilled, (state, action) => {
        const { data } = action.payload as RecipientListResponse;
        state.recentRecipient.list = data;
        state.recentRecipient.total = data.length;
        state.recentRecipient.loading = false;
      })
      .addCase(getRecentRecipient.rejected, (state, action) => {
        state.recentRecipient.loading = false;
      });
  },

});

export const { finishInitialLoad, updateBalance } = walletSlice.actions;
export default walletSlice.reducer;
