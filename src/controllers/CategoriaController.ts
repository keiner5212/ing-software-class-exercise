import { Request, Response, Router } from "express";
import { CategoriaDAO } from "../dao/CategoriaDAO";
import { CategoryBodyValidations } from "../middlewares/CategoryValidations";
import { Cache } from "../constants/cache";
import { CacheDelay } from "../middlewares/CacheDelay";
import { getDeltaTime } from "../utils/Time";
import { controllerDebugger } from "../utils/debugConfig";

export class CategoriaController extends CategoriaDAO {
	private router: Router;
	private cache: { [cachespace: string]: { [data: string]: any, time: Date } } = {}
	private lastRequest: Date;

	constructor() {
		super();
		this.router = Router();
		this.lastRequest = new Date()
		this.cacheData()
		setInterval(() => {
			if (getDeltaTime(this.lastRequest) < Cache.cacheSleepTime) { // stop refreshing cache if there's not requests in the last 2h
				this.cacheData()
			}
		}, Cache.cacheLifetime);
	}

	private async cacheData() {
		const data = await CategoriaDAO.getAll();
		controllerDebugger("updating cache")
		if (data) {
			this.cache["/get-allGET"] = {
				data: data,
				time: new Date()
			}
		}
	}

	public routes(): Router {
		//routes
		this.router.get("/", CacheDelay, async (req: Request, res: Response) => {
			res.status(200).send({
				endpoints: {
					getAll: "GET /get-all: get all categories",
					getById: "GET /:id: get category by id",
					add: "POST /: add category",
					update: "PUT /:id: update category",
					delete: "DELETE /:id: delete category",
				}
			})
		})

		//get all
		this.router.get("/get-all", async (req: Request, res: Response) => {
			try {
				const cachekey = req.path + req.method
				const data = this.cache[cachekey].data;
				// from cache
				setTimeout(() => { // prevent connection rejection
					res.status(200).send(data);
				}, Cache.cache_delay);
			} catch (error: any) {
				res.status(200).send({
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
					const data = await CategoriaDAO.getById(parseInt(id));
					if (data) {
						this.cache[cachekey] = {
							data: data,
							time: new Date()
						}
					}
					res.status(200).send(data);
				}
			} catch (error: any) {
				res.status(200).send({
					message: error.message,
				});
			}
		});

		// add
		this.router.post("/", CategoryBodyValidations, async (req: Request, res: Response) => {
			try {
				const { nombre_categoria } = req.body;
				const data = await CategoriaDAO.add(nombre_categoria);
				res.status(200).send(data);
			} catch (error: any) {
				res.status(200).send({
					message: error.message,
				});
			}
		});

		// update
		this.router.put("/:id", CategoryBodyValidations, async (req: Request, res: Response) => {
			try {
				const { id } = req.params;
				const { nombre_categoria } = req.body;
				const data = await CategoriaDAO.update(parseInt(id), nombre_categoria);
				res.status(200).send(data);
			} catch (error: any) {
				res.status(200).send({
					message: error.message,
				});
			}
		});

		// delete
		this.router.delete("/:id", async (req: Request, res: Response) => {
			try {
				const { id } = req.params;
				const data = await CategoriaDAO.delete(parseInt(id));
				res.status(200).send(data);
			} catch (error: any) {
				res.status(200).send({
					message: error.message,
				});
			}
		});

		return this.router;
	}
}
