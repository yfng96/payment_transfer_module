import { createSlice } from '@reduxjs/toolkit';
import { TransactionState } from '~/types';
import { createTransfer, TRANSACTION } from './transactionAction';

const initialState: TransactionState = {
  transaction: {
    accType: 1,
    accNo: '',
    bankCode: '',
    amount: 0,
    reference: '',
    recipientName: '',
  },
};

export const transactionSlice = createSlice({
  name: TRANSACTION,
  initialState,
  reducers: {
    setTransactionAccInfo: (state, action) => {
      const { accType, accNo, bankCode, recipientName, amount, reference } = action.payload;
      state.transaction.accType = accType || state.transaction.accType;
      state.transaction.accNo = accNo || state.transaction.accNo;
      state.transaction.bankCode = bankCode || state.transaction.bankCode;
      state.transaction.recipientName = recipientName || state.transaction.recipientName;
      state.transaction.amount = amount || state.transaction.amount;
      state.transaction.reference = reference || state.transaction.reference;
    },
    resetTransactionInfo: (state) => {
      state.transaction = initialState.transaction;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransfer.fulfilled, (state) => {
        state.transaction = initialState.transaction;
      });
  },
});

export const { setTransactionAccInfo, resetTransactionInfo } = transactionSlice.actions;
export default transactionSlice.reducer;
