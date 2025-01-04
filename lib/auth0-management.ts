import { ManagementClient } from 'auth0';

export const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_CLIENT_DOMAIN as string,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET as string,
});
