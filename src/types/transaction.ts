export interface Transaction {
  accType: number;
  accNo: string;
  bankCode: string;
  amount: number;
  reference: string;
  recipientName?: string;
}

export interface TransactionState {
  transaction: Transaction;
}
