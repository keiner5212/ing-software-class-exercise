-- dml: Data Manipulation Language
\c clase_ing_software


-- CREATE TABLE Categoria {
--     id_categoria SERIAL PRIMARY KEY,
--     nombre_categoria VARCHAR(200) NOT NULL
-- };
INSERT INTO
    Categoria (nombre_categoria)
VALUES
    ('Acción'),
    ('Comedia'),
    ('Drama'),
    ('Terror'),
    ('Ciencia ficción');

-- CREATE TABLE Pelicula (
--     id_pelicula SERIAL PRIMARY KEY,
--     nombre_pelicula VARCHAR(250) NOT NULL,
--     fecha_estreno_pelicula DATE NOT NULL,
--     duracion_pelicula INT NOT NULL,
--     id_categoria INT NOT NULL REFERENCES Categoria (id_categoria)
-- );
INSERT INTO
    Pelicula (
        nombre_pelicula,
        fecha_estreno_pelicula,
        duracion_pelicula,
        id_categoria
    )
VALUES
    ('El Padrino', '1972-03-06', 175, 1),
    ('El Padrino. Parte II', '1974-04-04', 202, 1),
    ('La lista de Schindler', '1993-12-15', 195, 2);