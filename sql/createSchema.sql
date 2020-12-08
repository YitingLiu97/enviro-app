-- Adapted from Don's repo: https://github.com/don/itp-connected-devices/blob/master/create-schema.sql
-- Sql cheatsheet https://devhints.io/mysql

create database conn_dev;
use conn_dev;

-- readings holds data points from devices
CREATE TABLE data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    micVal INT,
    waterVal INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- add dummy device to authorized_devices 
INSERT INTO (micVal, waterVal) VALUES (20,100); 