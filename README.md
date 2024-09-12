# satisfactory-server-sdk

To install dependencies:

```bash
export UID
docker compose run --rm bun install
```

To build:

```bash
export UID
docker compose run --rm node npm run build
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
