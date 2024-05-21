import { RedisClientType, createClient } from "redis"
import { errorDebugger, redisDebugger } from "./debugConfig";
import dotenv from "dotenv";


export class RedisConfig {
    private static instance: RedisConfig;
    private redisClient: RedisClientType;

    constructor() {
        dotenv.config();

        const redisUrl = process.env.REDIS_URL as string;

        this.redisClient = createClient({
            url: redisUrl,
            socket: redisUrl.startsWith("rediss://") ? { tls: true } : {},
        });

        this.redisClient.on("error", (err) => {
            errorDebugger("Redis client error:", err);
        });

        this.redisClient.on("ready", () => {
            redisDebugger("Redis client connected successfully");
        });

        this.redisClient.connect().catch((err) => {
            errorDebugger("Failed to connect to Redis:", err);
        });
    }

    public static getInstance(): RedisConfig {
        if (!RedisConfig.instance) {
            RedisConfig.instance = new RedisConfig();
        }
        return RedisConfig.instance;
    }

    public getRedisClient(): RedisClientType {
        return this.redisClient;
    }
}
