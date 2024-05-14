// CREATE TABLE
//     Categoria (
//         id_categoria SERIAL PRIMARY KEY,
//         nombre_categoria VARCHAR(200) NOT NULL
//     );

export class Categoria {
    private id_categoria: number;
    private nombre_categoria: string;

    constructor(id_categoria: number, nombre_categoria: string) {
        this.id_categoria = id_categoria;
        this.nombre_categoria = nombre_categoria;
    }

    // getters
    public getIdCategoria(): number {
        return this.id_categoria;
    }

    public getNombreCategoria(): string {
        return this.nombre_categoria;
    }

    // setters
    public setNombreCategoria(value: string) {
        this.nombre_categoria = value;
    }

    /* json example
     {
        "nombre_categoria": "x"
     }
     */
}