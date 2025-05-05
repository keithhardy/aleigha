import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`),
);

export async function verifyJwt(token: string) {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `${process.env.AUTH0_DOMAIN}/`,
    audience: process.env.AUTH0_AUDIENCE,
  });

  return payload;
}
