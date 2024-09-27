import { expect } from 'chai';
import { test } from './index.js';
import type {
  QueryServerStateResponseBody,
  ServerGameState,
} from '../../src/functions/query-server-state/index.js';
import SatisfactoryServer, { type ResponseBody } from '../../src/index.js';
import logger from '../../src/logger/index.js';
import loginAdministrator from './helpers/login-administrator.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';

function assertServerGameState({
  queryServerState,
  key,
  type,
}: {
  queryServerState: ResponseBody<QueryServerStateResponseBody>;
  key: keyof ServerGameState;
  type: string;
}) {
  test(`The queryServerState's data object's serverGameState object has the ${key} property`, () => {
    expect(queryServerState.data.serverGameState).to.have.property(key);
  });
  test(`The queryServerState's data object's serverGameState object's ${key} property is a string`, () => {
    expect(queryServerState.data.serverGameState[key]).to.be.a(type);
  });
}

async function runTests(satisfactoryServer: SatisfactoryServer) {
  await loginAdministrator(satisfactoryServer);
  const queryServerState = await satisfactoryServer.execute('queryserverstate');
  assertBasicResponseStructure(queryServerState);
  test("The queryServerState's data object has the serverGameState property", () => {
    expect(queryServerState.data).to.have.property('serverGameState');
  });
  test("The queryServerState's data object's serverGameState property is an object", () => {
    expect(queryServerState.data.serverGameState).to.be.an('object');
  });
  assertServerGameState({
    queryServerState,
    key: 'activeSessionName',
    type: 'string',
  });
  assertServerGameState({
    queryServerState,
    key: 'numConnectedPlayers',
    type: 'number',
  });
  assertServerGameState({
    queryServerState,
    key: 'playerLimit',
    type: 'number',
  });
  assertServerGameState({
    queryServerState,
    key: 'techTier',
    type: 'number',
  });
  assertServerGameState({
    queryServerState,
    key: 'activeSchematic',
    type: 'string',
  });
  assertServerGameState({
    queryServerState,
    key: 'gamePhase',
    type: 'string',
  });
  assertServerGameState({
    queryServerState,
    key: 'isGameRunning',
    type: 'boolean',
  });
  assertServerGameState({
    queryServerState,
    key: 'totalGameDuration',
    type: 'number',
  });
  assertServerGameState({
    queryServerState,
    key: 'isGameRunning',
    type: 'boolean',
  });
  assertServerGameState({
    queryServerState,
    key: 'averageTickRate',
    type: 'number',
  });
  assertServerGameState({
    queryServerState,
    key: 'autoLoadSessionName',
    type: 'string',
  });
}

async function execute() {
  logger.log('Testing Query server state...');
  const satisfactoryServer = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await runTests(satisfactoryServer);
  logger.log('Query server state testing complete.');
}

export default execute;
