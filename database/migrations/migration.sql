DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL 
);

CREATE TABLE menus(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    user_id int,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE 
); 

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    menu_id int,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(menu_id) REFERENCES menus(id) ON DELETE CASCADE 
); 

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id int,
    normal_price int,
    discount_price int,
    image VARCHAR(255),
    visible BOOLEAN NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
);



INSERT INTO users(name, email, password)
VALUES('Usuario 1','user1@gmail.com','password'),
      ('Usuario 2','user2@gmail.com','password'); 


INSERT INTO menus(name, url, user_id)
VALUES('Menú del día','url',1),
      ('Menú del día','url',2); 


INSERT INTO categories(name, description, menu_id)
VALUES('COMPLETOS','Los mejores completos',1),
      ('ENSALADAS','Los mejores ensaladas',1); 

 

INSERT INTO products(name, description, normal_price, discount_price, image, visible, category_id)
VALUES('SOLO', '', 2150, 2000, 'imagen', true, 1),
      ('chacarero','Poroto Verde / Ají Verde / Tomate / Mayo Dominó (Mayo sólo en Completo y As)', 2150, 2000, 'imagen', true, 1),
      ('luco','Queso a la Plancha', 2750, 2300, 'imagen', true, 1); 