CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  item_name TEXT NOT NULL,
  email TEXT NOT NULL,
  item_price NUMERIC NOT NULL,
  phone_number TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  location TEXT NOT NULL
);

INSERT INTO orders (order_id, item_name, email, item_price, phone_number, quantity, location)
VALUES
  (1, 'Item 1', 'email1@example.com', 10.99, '1234567890', 1, 'Location 1'),
  (2, 'Item 2', 'email2@example.com', 19.99, '0987654321', 2, 'Location 2');


CREATE TABLE users (
  user_id INT PRIMARY KEY,
  order_id INT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone_number VARCHAR(20),
  address VARCHAR(100),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);


INSERT INTO users (user_id, order_id, first_name, last_name, phone_number, address)
VALUES (1, 1, 'John', 'Doe', '1234567890', '123 Main St');

INSERT INTO users (user_id, order_id, first_name, last_name, phone_number, address)
VALUES (2, 2, 'Jane', 'Smith', '9876543210', '456 Elm St');

INSERT INTO users (user_id, order_id, first_name, last_name, phone_number, address)
VALUES (3, 1, 'Michael', 'Johnson', '5551234567', '789 Oak Ave');

INSERT INTO users (user_id, order_id, first_name, last_name, phone_number, address)
VALUES (4, 2, 'Emily', 'Brown', '2223334444', '321 Pine Ln');

INSERT INTO users (user_id, order_id, first_name, last_name, phone_number, address)
VALUES (5, 1, 'David', 'Wilson', '4445556666', '654 Cedar Rd');

CREATE TABLE login (
  user_id INT PRIMARY KEY,
  password VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

