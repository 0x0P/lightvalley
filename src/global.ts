import { Pool } from "pg";

const db = new Pool({
  user: "lightvalley",
  host: "localhost",
  database: "lightvalley",
  port: 5432,
});

export { db };
