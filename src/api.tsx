import { createServer } from "miragejs"

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = 'api'; // Prefix all routes with /api
      // Define a route for fetching properties
      this.get('/login', () => {
        return {
          token: "dsfsdf",
          expiredAt: "2025-10-10 10:00:00",
          user: {
            name: "John Doe",
            email: "chia5484@hotmail.com"
          }
        };
      });
    },
  });
}