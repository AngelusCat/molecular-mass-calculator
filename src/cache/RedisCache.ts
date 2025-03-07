import { Cache } from "../interfaces/Cache.js";
import { injectable } from "inversify";
import { correctType, notEmptyValue } from "../helpers/argumentChecks.js";
import Redis from "ioredis";

@injectable()
export class RedisCache implements Cache {
    private redis: Redis;

    constructor(redisClient: Redis) {
        this.redis = redisClient;
    }
    
    /**
     * Сохранить значение по ключу (SET key value)
     * @param {string} key ключ, под которым нужно сохранить значение
     * @param {string|Buffer} value значение, которое нужно сохранить
     */
    async set(key: string, value: string | Buffer): Promise<void> {
        notEmptyValue(key, "key");
        correctType(key, "string", "key");
        notEmptyValue(value, "value");
        await this.redis.set(key, value);
    }

    /**
     * Получить значение по ключу (GET key)
     * @param {string} key ключ, по которому нужно получить значение
     */
    async get(key: string): Promise<string | null> {
        notEmptyValue(key, "key");
        correctType(key, "string", "key");
        return await this.redis.get(key);
    }
}