CREATE USER lightvalley;
CREATE DATABASE lightvalley;
GRANT ALL PRIVILEGES ON DATABASE lightvalley TO lightvalley;

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
    name text,
    password text,
    salt text,
    time date,
    permission integer
);