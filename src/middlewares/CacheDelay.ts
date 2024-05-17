import { Cache } from "../constants/cache";

export const CacheDelay = (req: any, res: any, next: any) => {
    setTimeout(() => {
        next();
    }, Cache.cache_delay);
}