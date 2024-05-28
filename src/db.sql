CREATE DATABASE IF NOT EXISTS nodelogin;
USE nodelogin;


CREATE TABLE if NOT exists usuario (
    email VARCHAR (100) NOT NULL PRIMARY KEY,
    nombre VARCHAR (50) NOT NULL,
    password VARCHAR(200) NOT NULL
);