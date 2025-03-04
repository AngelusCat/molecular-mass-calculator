import Redis from "ioredis";
import { RedisCache } from "../../src/cache/RedisCache";

let cache: RedisCache;
const redisTest = new Redis({db: 1, host: "redis", port: 6379});

beforeAll(() => {
    cache = new RedisCache(redisTest);
});

beforeEach(async () => {
    await redisTest.flushdb();
});

afterAll(async () => {
    await redisTest.flushdb();
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

test('Redis получает null при попытке извлечь значение по несуществующему ключу из тестовой бд Redis (db:1)', async () => {
    const key = "testKey";

    const redisValue = await cache.get(key);
    expect(redisValue).toBe(null);
});