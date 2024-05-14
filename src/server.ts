import dotenv from "dotenv";
import { serverDebugger } from "./utils/debugConfig";
import { App } from "./app";

// CONFIGURATION
dotenv.config();
const PORT: number = parseInt(process.env.PORT ?? '3000', 10);

// APP
const app = new App().config();


// LISTEN
app.listen(PORT, () => {
    serverDebugger(`Listening on port ${PORT}`);
});
