CREATE USER lightvalley;
CREATE DATABASE lightvalley;
GRANT ALL PRIVILEGES ON DATABASE lightvalley TO lightvalley;
\c lightvalley lightvalley;

CREATE TABLE IF NOT EXISTS documents (
    version BIGINT,
    type TEXT,
    name TEXT UNIQUE NOT NULL,
    displayName TEXT,
    content TEXT,
    time DATE,
    category TEXT[], 
    read INTEGER,
    edit INTEGER
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    salt TEXT NOT NULL,
    time TIMESTAMP NOT NULL,
    permission integer
);
