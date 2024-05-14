import { Request, Response, Router } from "express";
import { CategoriaDAO } from "../dao/CategoriaDAO";

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
				}
			})
		})

		//get all
		this.router.get("/get-all", async (req: Request, res: Response) => {
			try {
				const data = await CategoriaDAO.getAll();
				res.status(200).send(data);
			} catch (error: any) {
				res.status(200).send({
					message: error.message,
				});
			}
		});

		// get by id
		this.router.get("/:id", async (req: Request, res: Response) => {
			const { id } = req.params;
			try {
				const data = await CategoriaDAO.getById(parseInt(id));
				res.status(200).send(data);
			} catch (error: any) {
				res.status(200).send({
					message: error.message,
				});
			}
		});

		// add
		this.router.post("/", async (req: Request, res: Response) => {
			const { nombre_categoria } = req.body;
			try {
				const data = await CategoriaDAO.add(nombre_categoria);
				res.status(200).send(data);
			} catch (error: any) {
				res.status(200).send({
					message: error.message,
				});
			}
		});

		// update
		this.router.put("/:id", async (req: Request, res: Response) => {
			const { id } = req.params;
			const { nombre_categoria } = req.body;
			try {
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
			const { id } = req.params;
			try {
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
