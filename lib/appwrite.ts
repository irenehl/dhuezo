import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://sfo.cloud.appwrite.io/v1')
  .setProject('6953629e0035b643ba39');

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };

