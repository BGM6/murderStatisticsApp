DROP DATABASE IF EXISTS murderDB;
CREATE DATABASE murderDB;
USE murderDB;
CREATE TABLE murder_per_city
(
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    murder2014 INT(4) NOT NULL,
    murder2015 INT(4) NOT NULL,
    difference VARCHAR(255) NOT NULL,
    PRIMARY KEY(city)

);