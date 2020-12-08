CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'PASSWORD_HERE';
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost' WITH GRANT OPTION;
flush privileges;


-- Tutorial to follow: https://www.digitalocean.com/community/tutorials/how-to-create-and-manage-tables-in-sql
-- If want to delete 
-- DROP USER 'username'@'localhost';
-- To log back 
-- mysql -u [username] -p

