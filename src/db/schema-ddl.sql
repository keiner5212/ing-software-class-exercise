-- ddl: Data Definition Language
DROP DATABASE IF EXISTS clase_ing_software;

CREATE DATABASE clase_ing_software;

\c clase_ing_software;

CREATE TABLE
    Categoria (
        id_categoria SERIAL PRIMARY KEY,
        nombre_categoria VARCHAR(200) NOT NULL
    );

CREATE TABLE
    Pelicula (
        id_pelicula SERIAL PRIMARY KEY,
        nombre_pelicula VARCHAR(250) NOT NULL,
        fecha_estreno_pelicula DATE NOT NULL,
        duracion_pelicula INT NOT NULL,
        id_categoria INT NOT NULL REFERENCES Categoria (id_categoria)
    );