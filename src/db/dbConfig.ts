import pgPromise from "pg-promise";
import dotenv from "dotenv";
import { dbDebugger } from "../utils/debugConfig";

dotenv.config();

// DB CONFIG
const dbConfig = {
  host: process.env.PG_HOST ?? '',
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE ?? '',
  user: process.env.PG_USER ?? '',
  password: process.env.PG_PASSWORD ?? '',
};

class DbConfig {
  private static instance: DbConfig;
  private db: pgPromise.IDatabase<any>;

  private constructor() {
    const pgp = pgPromise();
    this.db = pgp(dbConfig);
    this.connect();
  }

  public static getInstance(): DbConfig {
    if (!DbConfig.instance) {
      DbConfig.instance = new DbConfig();
    }
    return DbConfig.instance;
  }

  public connect(): void {
    this.db.connect()
      .then((obj: any) => {
        dbDebugger("Connected to the database:", obj.client.database);
        obj.done();
      })
      .catch((error: any) => {
        dbDebugger("Error connecting to the database:", error.message || error);
      });
  }

  public getDb() {
    return this.db;
  }
}

export default DbConfig;
