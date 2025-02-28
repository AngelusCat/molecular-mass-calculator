import { Cache } from "../interfaces/Cache.js";
import { redis } from "../databases/RedisConnection.js";
import { injectable } from "inversify";
import { correctType, notEmptyValue } from "../helpers/argumentChecks.js";

@injectable()
export class RedisCache implements Cache {
    /**
     * Сохранить значение по ключу (SET key value)
     * @param {string} key ключ, под которым нужно сохранить значение
     * @param {string|Buffer} value значение, которое нужно сохранить
     */
    async set(key: string, value: string | Buffer): Promise<void> {
        notEmptyValue(key, "key");
        correctType(key, "string", "key");
        notEmptyValue(value, "value");
        await redis.set(key, value);
    }

    /**
     * Получить значение по ключу (GET key)
     * @param {string} key ключ, по которому нужно получить значение
     */
    async get(key: string): Promise<string | null> {
        notEmptyValue(key, "key");
        correctType(key, "string", "key");
        return await redis.get(key);
    }
}