import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { CategoriaController } from "./controllers/CategoriaController";
import { PeliculaController } from "./controllers/PeliculaController";

export class App {
	private app: Application;
	private prefix = "/api/v1";


	constructor() {
		this.app = express();
	}

	private configuation() {
		// CONFIG
		this.app.disable("x-powered-by");
	}

	private midlewares() {
		// MIDDLEWARE
		this.app.use(morgan("dev"));
		this.app.use(cors());
		this.app.use(express.json());
	}

	private generalRoutes() {
		// ROUTES
		this.app.get("/", (req: Request, res: Response) => {
			res.send({
				message: "Welcome to the App",
				endpoints: {
					categoria: this.prefix + "/categoria",
					pelicula: this.prefix + "/pelicula",
				}
			});
		});
	}

	private controllerRoutes() {
		// Controllers ROUTES
		this.app.use(this.prefix + "/categoria", new CategoriaController().routes());
		this.app.use(this.prefix + "/pelicula", new PeliculaController().routes());

	}

	private NotFound() {
		// 404 PAGE
		this.app.use((req: Request, res: Response) => {
			res.status(404).send("Page not found");
		});
	}

	public config(): Application {
		this.configuation();
		this.midlewares();
		this.generalRoutes();
		this.controllerRoutes();
		this.NotFound();

		return this.app;
	}
}
