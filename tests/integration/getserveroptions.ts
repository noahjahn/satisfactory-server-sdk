import { expect } from 'chai';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { test } from './index.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';
import loginAdministrator from './helpers/login-administrator.js';

async function runTests(satisfactoryServer: SatisfactoryServer) {
  await loginAdministrator(satisfactoryServer);
  const serveroptions = await satisfactoryServer.execute('getserveroptions');

  assertBasicResponseStructure(serveroptions);

  test("The getserveroptions's data object has the serverOptions property", () => {
    expect(serveroptions.data).to.have.property('serverOptions');
  });

  test("The getserveroptions's data object has the pendingServerOptions property", () => {
    expect(serveroptions.data).to.have.property('pendingServerOptions');
  });

  test("The getserveroptions's data.serverOptions object's FG.DSAutoPause property is literal True, False or a string", () => {
    expect(serveroptions.data.serverOptions['FG.DSAutoPause']).to.be.a(
      'string',
    );
    expect(serveroptions.data.serverOptions['FG.DSAutoPause']).to.be.oneOf([
      'True',
      'False',
    ]);
  });

  test("The getserveroptions's data.serverOptions object's FG.DSAutoSaveOnDisconnect property is literal True, False or a string", () => {
    expect(
      serveroptions.data.serverOptions['FG.DSAutoSaveOnDisconnect'],
    ).to.be.a('string');
    expect(
      serveroptions.data.serverOptions['FG.DSAutoSaveOnDisconnect'],
    ).to.be.oneOf(['True', 'False']);
  });

  test("The getserveroptions's data.serverOptions object's FG.AutosaveInterval property is a string", () => {
    expect(serveroptions.data.serverOptions['FG.AutosaveInterval']).to.be.a(
      'string',
    );
  });

  test("The getserveroptions's data.serverOptions object's FG.ServerRestartTimeSlot property is a string", () => {
    expect(
      serveroptions.data.serverOptions['FG.ServerRestartTimeSlot'],
    ).to.be.a('string');
  });

  test("The getserveroptions's data.serverOptions object's FG.SendGameplayData property is literal True, False or a string", () => {
    expect(serveroptions.data.serverOptions['FG.SendGameplayData']).to.be.a(
      'string',
    );
    expect(serveroptions.data.serverOptions['FG.SendGameplayData']).to.be.oneOf(
      ['True', 'False'],
    );
  });

  test("The getserveroptions's data.serverOptions object's FG.NetworkQuality property is a string", () => {
    expect(serveroptions.data.serverOptions['FG.NetworkQuality']).to.be.a(
      'string',
    );
  });
}

async function execute() {
  logger.log('Testing Get Server Options...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await runTests(satisfactorySecure);
  logger.log('Health Check testing complete.');
}

export default execute;
