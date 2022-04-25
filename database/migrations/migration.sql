/*CREATE EXTENSION pgcrypto;*/

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
VALUES('Usuario 1','test@test.cl', crypt('test@test.cl', gen_salt('bf'))),
      ('Usuario 2','test2@test.cl', crypt('test2@test.cl', gen_salt('bf'))); 


INSERT INTO menus(name, url, user_id)
VALUES('Menú del día','url',1),
      ('Menú del día','url',2); 


INSERT INTO categories(name, description, menu_id)
VALUES('COMPLETOS','Los mejores completos',1),
      ('HAMBURGUESAS','Los mejores Hamburguesas',1),
      ('BEBIDAS CON ALCOHOL', 'Disponible desde las 10:00 hrs. Variedades sujetas a disponibilidad de cada local.', 1),
      ('BEBIDAS SIN ALCOHOL', 'Directamente desde nuestra barra de jugos. Disponibles según estación.', 1); 

 

INSERT INTO products(name, description, normal_price, discount_price, image, visible, category_id)
VALUES('SOLO', '', 2150, 2000, 'completo.jpg', true, 1),
      ('chacarero','Poroto Verde / Ají Verde / Tomate / Mayo casera', 2150, 2000, 'chacarero.jpg', true, 1),
      ('luco','Queso a la Plancha', 2750, 2300, 'imagen', true, 1),
      ('Dinamico','Palta Hass / Americana / Salsa Verde / Tomate / Mayo casera', 3050, 2900, 'dinamico.jpg', true, 1),
      ('Rodeo Spicy','Salsa BBQ Spicy / Queso Cheddar / Tocino', 9750, 9500, 'hamburguesa.jpg', true, 2),
      ('Cheddar Pepinillo','Salsa BBQ Spicy / Queso Cheddar / Pepinillos', 9750, 9500, 'hamburguesa.jpg', true, 2),
      ('Americana', 'Salsa Casera / Salsa Verde / Pepinillos / Lechuga / Tomate / Queso Cheddar', 8750, 8300, 'hamburguesa.jpg', true, 1),
      ('Heineken','(Lager 5,0%)', 3250, 3250, 'shop.jpg', true, 3),
      ('Kunstmann Torobayo','(Pale Ale 5,0%)', 3850, 3850, 'shop.jpg', true, 3),
      ('Austral Calafate','(Calafate Ale 5,0%)', 3850, 3850, 'shop.jpg', true, 3),
      ('Jugos Tradicionales - Endulzados con azúcar','Frutos del Bosque / Frambuesa / Chirimoya / Piña / Mango / Frutilla (Sin azúcar) / Melón Tuna', 2650, 2650, 'jugos.jpg', true, 4),
      ('JUGOS MIXTOS',' Frambuesa · Chirimoya / Piña · Frambuesa / Chirimoya · Naranja', 3450, 3450, 'jugos.jpg', true, 4); 