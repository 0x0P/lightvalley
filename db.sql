CREATE USER lightvalley;
create database lightvalley;
GRANT ALL PRIVILEGES ON DATABASE lightvalley TO lightvalley;

create table documents (
    version bigint,
    name text,
    fakeName text,
    content text,
    time date
)

