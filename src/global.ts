import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "lightvalley",
    database: "lightvalley",
  },
});
export { db };
