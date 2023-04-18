CREATE USER lightvalley;
CREATE DATABASE lightvalley;
GRANT ALL PRIVILEGES ON DATABASE lightvalley TO lightvalley;
\c lightvalley lightvalley;

CREATE TABLE IF NOT EXISTS documents (
    version BIGINT,
    type TEXT,
    author TEXT,
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
    tag VARCHAR(4) CHECK (tag ~ '^[0-9]{4}$') NOT NULL,
    identifier TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    time TIMESTAMP NOT NULL,
    permission integer
);
