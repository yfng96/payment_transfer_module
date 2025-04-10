import { Server } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api";

      this.post("/login", (schema, request) => {
        return {
          token: "sdfsfdss",
          expiredAt: "2025-10-10 10:00:00",
          user: {
            name: "John Doe",
            email: "chia5484@hotmail.com"
          }
        };
      });
    },
  });

  return server;
}