export interface Balance {
  amount: number;
  currency: string;
  loading: boolean;
}

export interface RecipientListType {
  list: RecipientInfo[];
  loading: boolean;
  total?: number;
}

export interface TransactionListType {
  list: any[];
  loading: boolean;
  total?: number;
}

export interface WalletState {
  initialLoaded: boolean;
  balance: Balance;
  transactionHistory: TransactionListType;
  recentTransaction: TransactionListType;
  favouriteRecipient: RecipientListType;
  recentRecipient: RecipientListType;
}

export interface TransactionHistoryResponse {
  data: TransactionHistory[];
  total?: number;
}

export interface TransactionHistory {
  refCode: string;
  accType: number;
  bankCode?: string | null;
  description?: string;
  reference?: string;
  recipientName?: string | null;
  amount: number;
  action?: string;
  currency: string;
  createdAt: string;
  type: string;
}

export interface RecipientInfo {
  name: string;
  type: number;
  bankCode?: string;
  bankName?: string;
  accountNo: string;
}

export interface RecipientListResponse {
  data: RecipientInfo[];
  total?: number;
}
