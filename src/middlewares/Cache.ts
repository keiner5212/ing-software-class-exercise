import { Request, Response } from "express";
import { RedisConfig } from "../utils/cache";
import { middlewareDebugger } from "../utils/debugConfig";
const RedisClient = RedisConfig.getInstance().getRedisClient();

export const CheckCache = async (req: Request, res: Response, next: any) => {
    const cacheKey = req.method + req.originalUrl;
    const cachedData = await RedisClient.get(cacheKey);
    if (cachedData) {
        middlewareDebugger(`Cache found for ${cacheKey}`);
        return res.status(200).send(JSON.parse(cachedData));
    } else {
        req.body.cacheKey = cacheKey;
        next();
    }

}