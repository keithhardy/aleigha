const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function generateRandomUPRN() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 10 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

function getRandomOccupier() {
  return Math.random() < 0.5 ? "Void" : "Tenanted";
}

function generateUKPhoneNumber(type = "mobile") {
  if (type === "mobile") {
    return `07${faker.string.numeric(9)}`;
  } else {
    return `01${faker.string.numeric(9)}`;
  }
}

async function main() {
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          auth0Id: `auth0|${generateRandomUPRN()}`,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: generateUKPhoneNumber(),
          signature: faker.image.url(),
        },
      })
    )
  );

  console.log("10 Users created.");

  const clients = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.client.create({
        data: {
          name: faker.company.name(),
          phone: generateUKPhoneNumber("landline"),
          picture: faker.image.avatar(),
          appointedPerson: faker.person.fullName(),
          address: {
            create: {
              streetAddress: faker.location.streetAddress(),
              city: faker.location.city(),
              county: faker.location.county(),
              postTown: faker.location.city(),
              postCode: faker.location.zipCode("??# #??"),
              country: "United Kingdom",
            },
          },
        },
      })
    )
  );

  console.log("10 Clients created.");

  const properties = await Promise.all(
    Array.from({ length: 50 }).map(() =>
      prisma.property.create({
        data: {
          uprn: generateRandomUPRN(),
          occupier: getRandomOccupier(),
          address: {
            create: {
              streetAddress: faker.location.streetAddress(),
              city: faker.location.city(),
              county: faker.location.county(),
              postTown: faker.location.city(),
              postCode: faker.location.zipCode("??# #??"),
              country: "United Kingdom",
            },
          },
        },
      })
    )
  );

  console.log("50 Properties created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
