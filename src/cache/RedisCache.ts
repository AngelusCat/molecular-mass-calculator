import { Cache } from "../interfaces/Cache.js";
import { redis } from "../databases/RedisConnection.js";

export class RedisCache implements Cache {
    /**
     * Сохранить значение по ключу (SET key value)
     * @param {string} key ключ, под которым нужно сохранить значение
     * @param {string|Buffer} value значение, которое нужно сохранить
     */
    async set(key: string, value: string | Buffer): Promise<void> {
        await redis.set(key, value);
    }

    /**
     * Получить значение по ключу (GET key)
     * @param {string} key ключ, по которому нужно получить значение
     */
    async get(key: string): Promise<string | null> {
        return await redis.get(key);
    }
}