import { Server, Model, Registry, Response } from "miragejs";
import { mockTransactions } from "./data/wallet";
import { LoginResponse, TransactionHistoryResponse } from "~/types";

interface WalletInfo {
  balance: number;
  currency: string;
}

interface WalletInfoResponse {
  balance: number;
  currency: string;
}

export function makeServer({ environment = "development" }: { environment?: string } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api";

      this.post("/login", (schema, request): LoginResponse => {
        return {
          token: "sdfsfdss",
          expiredAt: "2025-10-10 10:00:00",
          user: {
            name: "John Doe",
            email: "chia5484@hotmail.com",
          },
        };
      });

      this.get("/wallet-info", (schema, request): WalletInfoResponse => {
        return {
          balance: 5000,
          currency: "MYR",
        };
      });

      this.get("/api/transaction-history/list", (schema, request): TransactionHistoryResponse => {
        const { length, start } = request.queryParams;
        const startIndex = parseInt(Array.isArray(start) ? start[0] : start || "0", 10);
        const lengthIndex = parseInt(Array.isArray(length) ? length[0] : length || "0", 10);

        let list = mockTransactions.slice(startIndex, startIndex + lengthIndex);

        return {
          data: list,
          total: mockTransactions.length,
        };
      });

      this.get("/api/transaction-history/recent", (schema, request): TransactionHistoryResponse => {
        let list = mockTransactions.slice(0, 3);
        return {
          data: list,
        };
      });
    },
  });

  return server;
}
