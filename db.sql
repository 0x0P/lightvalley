CREATE USER lightvalley;
CREATE DATABASE lightvalley;
GRANT ALL PRIVILEGES ON DATABASE lightvalley TO lightvalley;

CREATE TABLE documents (
    version bigint,
    name text,
    displayName text,
    content text,
    time date,
    permisson text
)

