# satisfactory-server-sdk

To install dependencies:

```bash
./bun i
```

To build:

```bash
./build
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
./test
```

## More info

- HTTP API documentation is downloaded with the game
  - The path would look something like `path/to/game/Satisfactory/CommunityResources/DedicatedServerAPIDocs.md`

## Roadmap/Ideas

### Required for initial release

- [ ] Completly implement all functions from documentation
  - [x] HealthCheck
  - [ ] VerifyAuthenticationToken
  - [ ] PasswordlessLogin
  - [x] PasswordLogin
  - [x] QueryServerState
  - [ ] GetServerOptions
  - [ ] GetAdvancedGameSettings
  - [ ] ApplyAdvancedGameSettings
  - [ ] ClaimServer
  - [ ] RenameServer
  - [ ] SetClientPassword
  - [ ] SetAdminPassword
  - [ ] SetAutoLoadSessionName
  - [ ] RunCommand
  - [ ] Shutdown
  - [ ] ApplyServerOptions
  - [ ] CreateNewGame
  - [ ] SaveGame
  - [ ] DeleteSaveFile
  - [ ] DeleteSaveSession
  - [ ] EnumerateSessions
  - [ ] LoadGame
  - [ ] UploadSaveGame
  - [ ] DownloadSaveGame
- [ ] Set up Vitepress
  - [ ] Add examples for every function
  - [x] Add install and configuration steps
  - [x] Setup typedoc to auto generate markdown for API reference in Vitepress
  - [ ] Setup and host on GitHub pages via Github action workflow
- [ ] Publish to NPM from a GitHub action workflow
  - [ ] Publish a TS version
  - [ ] Publish a JS version
- [ ] Add tests to Github action workflow
- [ ] Run integration tests with a localized satisfactory server running in a docker container
- [ ] Version this package to follow version of the dedicated server, so developers always know which version of the SDK will fully support which version of the server

### Future

- Automatically execute tests whenever a new dedicated server version is release
- Notify test results to proactively be told when things need to change to support different versions
- build a cli with the sdk
- Add more typedoc documentation
