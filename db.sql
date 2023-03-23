create user lightvalley@localhost;
grant all privileges on lightvalley.* to lightvalley@localhost;
create database lightvalley;
use lightvalley;

create table documents (
    version number
    name text,
    fakeName text,
    content text,
)

