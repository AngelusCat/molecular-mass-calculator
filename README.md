## Deploy

**Условия**:
- Ubuntu 24.04.1 LTS (Desktop, 64-bit);
- Docker version 28.0.1, build 068a01e;
- Docker Compose version v2.33.1.

**Выполнить**:
```bash
sudo docker compose up
```

**Если были внесены изменения**:
```bash
docker compose up --build
```

**Если нужно запустить тесты**:
__Получить CONTAINER_ID (Node.js)__
```bash
sudo docker ps -a
```
__Зайти в контейнер__:
```bash
sudo docker exec -ti <CONTAINER_ID> sh
```
__Выполнить__:
```bash
npm test
```

**Если Node.js не видит Redis**:
Просмотреть файлы исходного проекта, убедиться, что host и port правильные (соединение с Redis создается с помощью new Redis() библиотеки ioredis).

## Как установить Docker и Docker Compose

**Условия**:
- curl;

```bash
curl https://get.docker.com > /tmp/install.sh
chmod +x /tmp/install.sh
/tmp/install.sh
```