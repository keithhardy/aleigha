import { jwtVerify, createRemoteJWKSet } from "jose";

const jwks = createRemoteJWKSet(
  new URL(`${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`),
);

export async function verifyJwt(jwt: string) {
  return await jwtVerify(jwt, jwks, {
    issuer: `${process.env.AUTH0_DOMAIN}/`,
    audience: process.env.AUTH0_AUDIENCE,
  });
}
