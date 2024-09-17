# satisfactory-server-sdk

To install dependencies:

```bash
export UID
docker compose run --rm bun i
```

To build:

```bash
export UID
docker compose run --rm node npm run build
```

---

## Testing

Before testing, be sure to Copy `.env.example` to `.env` and set the variables to your test environment

TODO: run satisfactory server in a container and wait for the server to be available

```
cp .env.example .env
```

To test:

```bash
export UID
docker compose run --rm node npm run test
```

To build and test:

```bash
export UID
docker compose run --rm node npm run build-and-test
```
