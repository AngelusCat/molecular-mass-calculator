import Redis from "ioredis";

const redis = new Redis();

redis.on("connect", () => {
    console.log("Подключено к Redis");
  });
  
redis.on("error", (err) => {
   console.error("Ошибка Redis:", err);
});

export {redis};