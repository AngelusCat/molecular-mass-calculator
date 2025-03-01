import Redis from "ioredis";
import { RedisCache } from "../../src/cache/RedisCache";

let cache: RedisCache;
const redisTest = new Redis({db: 1});

beforeAll(() => {
    cache = new RedisCache(redisTest);
});

afterAll(async () => {
    await redisTest.flushall();
    await redisTest.quit();
});

test('Redis сохраняет значение testValue по ключу testKey в тестовую бд Redis (db: 1)', async () => {
    const key = "testKey";
    const value = "testValue";

    await cache.set(key, value);

    const redisValue = await redisTest.get(key);
    expect(redisValue).toBe(value);
});

test('Redis получает значение testValue по ключу testKey из тестовой бд Redis (db:1)', async () => {
    const key = "testKey";
    const value = "testValue";

    await redisTest.set(key, value);

    const redisValue = await cache.get(key);
    expect(redisValue).toBe(value);
});