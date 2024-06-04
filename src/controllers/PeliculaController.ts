import { Request, Response, Router } from "express";
import { PeliculaDAO } from "../dao/PeliculaDAO";
import { MovieBodyValidations } from "../middlewares/MovieValidations";
import { CheckCache } from "../middlewares/Cache";
import { RedisConfig } from "../utils/cache";
import { Pagination } from "../constants/pagination";

const RedisClient = RedisConfig.getInstance().getRedisClient();

export class PeliculaController extends PeliculaDAO {
    private router: Router;

    constructor() {
        super();
        this.router = Router();
    }

    public routes(): Router {
        //routes
        this.router.get("/", async (req: Request, res: Response) => {
            res.status(200).send({
                endpoints: {
                    getAll: "GET /get-all: get all peliculas",
                    getById: "GET /:id: get pelicula by id",
                    add: "POST /: add pelicula",
                    update: "PUT /:id: update pelicula",
                    delete: "DELETE /:id: delete pelicula",
                },
            });
        });

        // //get all
        this.router.get(
            "/get-all",
            CheckCache,
            async (req: Request, res: Response) => {
                try {
                    const { page = Pagination.defaultPage } = req.query;
                    const data = await PeliculaDAO.getAll(
                        parseInt(page as string)
                    );
                    await RedisClient.set(
                        req.body.cacheKey + page,
                        JSON.stringify(data),
                        { EX: 60 }
                    );
                    res.status(200).send(data);
                } catch (error: any) {
                    res.status(404).send({
                        message: error.message,
                    });
                }
            }
        );

        // get by id
        this.router.get(
            "/:id",
            CheckCache,
            async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;
                    const data = await PeliculaDAO.getById(parseInt(id));
                    await RedisClient.set(
                        req.body.cacheKey,
                        JSON.stringify(data),
                        { EX: 60 }
                    );
                    res.status(200).send(data);
                } catch (error: any) {
                    res.status(404).send({
                        message: error.message,
                    });
                }
            }
        );

        // add
        this.router.post(
            "/",
            MovieBodyValidations,
            async (req: Request, res: Response) => {
                const {
                    nombre_pelicula,
                    fecha_estreno_pelicula,
                    duracion_pelicula,
                    id_categoria,
                } = req.body;
                try {
                    const data = await PeliculaDAO.add(
                        nombre_pelicula,
                        fecha_estreno_pelicula,
                        duracion_pelicula,
                        id_categoria
                    );
                    res.status(200).send(data);
                } catch (error: any) {
                    res.status(404).send({
                        message: error.message,
                    });
                }
            }
        );

        // update
        this.router.put(
            "/:id",
            MovieBodyValidations,
            async (req: Request, res: Response) => {
                const { id } = req.params;
                const {
                    nombre_pelicula,
                    fecha_estreno_pelicula,
                    duracion_pelicula,
                    id_categoria,
                } = req.body;
                try {
                    const data = await PeliculaDAO.update(
                        parseInt(id),
                        nombre_pelicula,
                        fecha_estreno_pelicula,
                        duracion_pelicula,
                        id_categoria
                    );
                    res.status(200).send(data);
                } catch (error: any) {
                    res.status(404).send({
                        message: error.message,
                    });
                }
            }
        );

        // delete all
        this.router.delete("/all", async (req: Request, res: Response) => {
            try {
                const data = await PeliculaDAO.deleteALL();
                res.status(200).send(data);
            } catch (error: any) {
                res.status(404).send({
                    message: error.message,
                });
            }
        });
        
        // delete
        this.router.delete("/:id", async (req: Request, res: Response) => {
            const { id } = req.params;
            try {
                const data = await PeliculaDAO.delete(parseInt(id));
                res.status(200).send(data);
            } catch (error: any) {
                res.status(404).send({
                    message: error.message,
                });
            }
        });


        return this.router;
    }
}
