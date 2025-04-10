export interface Balance {
  amount: number;
  currency: string;
  loading: boolean;
}

export interface RecipientListType {
  list: RecipientInfo[];
  loading: boolean;
  error: string | null;
  total: number;
}

export interface WalletState {
  balance: Balance;
  transactionHistory: {
    list: any[];
    loading: boolean;
    error: string | null;
    total: number;
  };
  recentTransaction: {
    list: any[];
    loading: boolean;
    error: string | null;
  };
  favouriteRecipient: RecipientListType;
  recentRecipient: RecipientListType;
}

export interface TransactionHistoryResponse {
  data: TransactionHistory[];
  total?: number;
}

export interface TransactionHistory {
  id: string;
  category: string;
  amount: number;
  remark: string;
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
