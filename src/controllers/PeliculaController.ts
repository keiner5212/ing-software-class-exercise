import { Request, Response, Router } from "express";
import { PeliculaDAO } from "../dao/PeliculaDAO";
import { Cache } from "../constants/cache";
import { MovieBodyValidations } from "../middlewares/MovieValidations";
import { CacheDelay } from "../middlewares/CacheDelay";
import { getDeltaTime } from "../utils/Time";

export class PeliculaController extends PeliculaDAO {
    private router: Router;
    private cache: { [cachespace: string]: { [data: string]: any, time: Date } } = {}

    constructor() {
        super();
        this.router = Router();
    }

    public routes(): Router {
        //routes
        this.router.get("/", CacheDelay, async (req: Request, res: Response) => {
            res.status(200).send({
                endpoints: {
                    getAll: "GET /get-all: get all peliculas",
                    getById: "GET /:id: get pelicula by id",
                    add: "POST /: add pelicula",
                    update: "PUT /:id: update pelicula",
                    delete: "DELETE /:id: delete pelicula",
                }
            })
        })

        // //get all
        this.router.get("/get-all", async (req: Request, res: Response) => {
            try {
                const cachekey = req.path + req.method
                if (this.cache[cachekey] && getDeltaTime(this.cache[cachekey].time) < Cache.cacheLifetime) {
                    const data = this.cache[cachekey].data;
                    // from cache
                    setTimeout(() => { // prevent connection rejection
                        res.status(200).send(data);
                    }, Cache.cache_delay);
                } else {
                    const result = await PeliculaDAO.getAll();
                    if (result && result.length > 0) {
                        this.cache[cachekey] = {
                            data: result,
                            time: new Date()
                        }
                    }

                    // from database
                    res.status(200).send(result);
                }
            } catch (error: any) {
                res.status(404).send({
                    message: error.message,
                });
            }
        });

        // get by id
        this.router.get("/:id", async (req: Request, res: Response) => {
            try {
                const cachekey = req.path + req.method
                if (this.cache[cachekey] && getDeltaTime(this.cache[cachekey].time) < Cache.cacheLifetime) {
                    const data = this.cache[cachekey].data;
                    // from cache
                    setTimeout(() => { // prevent connection rejection
                        res.status(200).send(data);
                    }, Cache.cache_delay);
                } else {
                    const { id } = req.params;
                    const data = await PeliculaDAO.getById(parseInt(id));
                    res.status(200).send(data);
                }
            } catch (error: any) {
                res.status(404).send({
                    message: error.message,
                });
            }
        });

        // add
        this.router.post("/", MovieBodyValidations, async (req: Request, res: Response) => {
            const { nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria } = req.body;
            try {
                const data = await PeliculaDAO.add(nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria);
                res.status(200).send(data);
            } catch (error: any) {
                res.status(404).send({
                    message: error.message,
                });
            }
        });

        // update
        this.router.put("/:id", MovieBodyValidations, async (req: Request, res: Response) => {
            const { id } = req.params;
            const { nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria } = req.body;
            try {
                const data = await PeliculaDAO.update(parseInt(id), nombre_pelicula, fecha_estreno_pelicula, duracion_pelicula, id_categoria);
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
