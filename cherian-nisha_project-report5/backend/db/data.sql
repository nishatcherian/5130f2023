create database shopping_list;
use shopping_list;
create table users (
    userid varchar(50) primary key,
    password varchar(50)
);
CREATE TABLE lists(
    id varchar(50) primary key,
    name varchar(100),
    description text,
    userid varchar(50),
    foreign key(userid) references users(userid)
);
create table items (
    id varchar(50) primary key,
    name varchar(100),
    description text,
    link varchar(500),
    price decimal,
    listid varchar(50),
    foreign key(listid) references lists(id)  
);
