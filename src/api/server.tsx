import { Server, Response } from 'miragejs';
import { mockRecipients, mockTransactions } from './data/wallet';
import { LoginResponse, RecipientInfo, TransactionHistory } from '~/types';


export function makeServer({ token }: { token?: string } = {}) {
  let server = new Server({
    routes() {
      this.namespace = 'api';

      this.post('/login', (schema, request): Response => {
        const { email, password } = JSON.parse(request.requestBody);
        if (email !== 'admin@hotmail.com' || password !== '123456') {
          return new Response(400, {}, { error: 'Invalid email or password' });
        }

        return new Response(200, {}, {
          token: 'sdfsfdsssdsdffsdfsdf',
          expiredAt: '2025-10-10 10:00:00',
          user: {
            name: 'John Doe',
            email: 'admin@hotmail.com',
          },
        });
      });

      this.get('/wallet-info', (schema, request): Response => {
        if (!token) {
          return new Response(401, {}, { error: 'Unauthorized' });
        }

        return new Response(200, {}, {
          balance: 5000,
          currency: 'MYR',
        });
      });

      this.get('/transaction-history/list', (schema, request): Response => {
        if (!token) {
          return new Response(401, {}, { error: 'Unauthorized' });
        }

        const { length, start } = request.queryParams;
        const startIndex = parseInt(Array.isArray(start) ? start[0] : start || '0', 10);
        const lengthIndex = parseInt(Array.isArray(length) ? length[0] : length || '0', 10);

        let list: TransactionHistory[] = mockTransactions.slice(startIndex, startIndex + lengthIndex);

        return new Response(200, {}, {
          data: list,
          total: mockTransactions.length,
        });
      });

      this.get('/transaction-history/recent', (schema, request): Response => {
        if (!token) {
          return new Response(401, {}, { error: 'Unauthorized' });
        }

        let list: TransactionHistory[] = mockTransactions.slice(0, 4);
        return new Response(200, {}, { data: list });
      });

      this.get('/recipient/favourite', (schema, request): Response => {
        if (!token) {
          return new Response(401, {}, { error: 'Unauthorized' });
        }

        let list: RecipientInfo[] = [...mockRecipients];
        return new Response(200, {}, { data: list });
      });

      this.get('/recipient/recent', (schema, request): Response => {
        if (!token) {
          return new Response(401, {}, { error: 'Unauthorized' });
        }

        let list: RecipientInfo[] = mockRecipients.slice(0, 2);
        return new Response(200, {}, { data: list });
      });

      this.post('/transfer', (schema, request): Response => {
        if (!token) {
          return new Response(401, {}, { error: 'Unauthorized' });
        }

        return new Response(200, {}, { data: null, message: 'Transfer successful' });
      });
    },
  });

  return server;
}
