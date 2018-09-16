DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price FLOAT (11,2) NULL,
  stock_quantity INT (11)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sporting Goods", 27.99, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cleats", "Sporting Goods", 99.95, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kicking Tee", "Sporting Goods", 6.99, 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jersey", "Sporting Goods", 89.99, 140);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chain-link", "Sporting Goods", 26.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Turkey Baster", "Kitchen&Bath", 5.99, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cast Iron Pot", "Ktichen&Bath", 44.95, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cast Iron Skillet", "Kitchen&Bath", 37.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candle Holders", "Kitchen&Bath", 33.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silver Meat Platter", "Kitchen&Bath", 65.99, 11);




