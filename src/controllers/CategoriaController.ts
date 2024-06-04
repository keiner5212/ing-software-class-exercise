import { Request, Response, Router } from "express";
import { CategoriaDAO } from "../dao/CategoriaDAO";
import { CategoryBodyValidations } from "../middlewares/CategoryValidations";
import { CheckCache } from "../middlewares/Cache";
import { RedisConfig } from "../utils/cache";
import { Pagination } from "../constants/pagination";

const RedisClient = RedisConfig.getInstance().getRedisClient();

export class CategoriaController extends CategoriaDAO {
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
					getAll: "GET /get-all: get all categories",
					getById: "GET /:id: get category by id",
					add: "POST /: add category",
					update: "PUT /:id: update category",
					delete: "DELETE /:id: delete category",
				},
			});
		});

		//get all
		this.router.get(
			"/get-all",
			CheckCache,
			async (req: Request, res: Response) => {
				try {
					const { page = Pagination.defaultPage } = req.query;
					const data = await CategoriaDAO.getAll(
						parseInt(page as string)
					);
					await RedisClient.set(
						req.body.cacheKey + page,
						JSON.stringify(data),
						{ EX: 60 }
					);
					res.status(200).send(data);
				} catch (error: any) {
					res.status(200).send({
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
					const data = await CategoriaDAO.getById(parseInt(id));
					await RedisClient.set(
						req.body.cacheKey,
						JSON.stringify(data),
						{ EX: 60 }
					);
					res.status(200).send(data);
				} catch (error: any) {
					res.status(200).send({
						message: error.message,
					});
				}
			}
		);

		// add
		this.router.post(
			"/",
			CategoryBodyValidations,
			async (req: Request, res: Response) => {
				try {
					const { nombre_categoria } = req.body;
					const data = await CategoriaDAO.add(nombre_categoria);
					res.status(200).send(data);
				} catch (error: any) {
					res.status(200).send({
						message: error.message,
					});
				}
			}
		);

		// update
		this.router.put(
			"/:id",
			CategoryBodyValidations,
			async (req: Request, res: Response) => {
				try {
					const { id } = req.params;
					const { nombre_categoria } = req.body;
					const data = await CategoriaDAO.update(
						parseInt(id),
						nombre_categoria
					);
					res.status(200).send(data);
				} catch (error: any) {
					res.status(200).send({
						message: error.message,
					});
				}
			}
		);

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
