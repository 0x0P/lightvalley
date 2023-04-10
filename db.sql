CREATE USER lightvalley;
CREATE DATABASE lightvalley;
GRANT ALL PRIVILEGES ON DATABASE lightvalley TO lightvalley;
\c lightvalley lightvalley;

CREATE TABLE IF NOT EXISTS documents (
    version bigint,
    type text,
    name text,
    displayName text,
    content text,
    time date,
    read integer,
    edit integer
);

CREATE TABLE IF NOT EXISTS users (
    id serial UNIQUE PRIMARY KEY,
    name text NOT NULL,
    password bytea NOT NULL,
    salt bytea NOT NULL,
    time timestamp NOT NULL,
    permission integer
);
