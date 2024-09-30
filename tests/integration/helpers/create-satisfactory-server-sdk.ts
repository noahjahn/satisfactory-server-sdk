import SatisfactoryServer from '../../../src/index.js';

export default function createSatisfactoryServerSdk() {
  if (!process.env.SATISFACTORY_SERVER_BASE_URL) {
    throw new Error(
      'Please set the SATISFACTORY_SERVER_BASE_URL environment variable',
    );
  }
  return new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}:7777`,
    {
      insecure: true,
    },
  );
}
