const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.settings.create({
    data: {
      name: "AB Building and Electrical LTD",
      email: "info@abelec.org",
      phone: "08452657544",
      picture: faker.image.avatar(),
      governingBody: "NIC EIC",
      governingBodyNumber: "172783",
      address: {
        create: {
          streetAddress: "3 Page Lane",
          city: "Widnes",
          county: "Cheshire",
          postTown: "Widnes",
          postCode: "WA8 0AE",
        },
      },
    },
  });

  const clients = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.client.create({
        data: {
          name: faker.company.name(),
          email: faker.internet.email(),
          phone: `01${faker.string.numeric(9)}`,
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

  const properties = await Promise.all(
    Array.from({ length: 250 }).map(() =>
      prisma.property.create({
        data: {
          uprn: faker.string.alphanumeric({ length: 10, case: "upper" }),
          occupier: faker.helpers.arrayElement(["Void", "Occupied"]),
          client: {
            connect: {
              id: faker.helpers.arrayElement(clients).id,
            },
          },
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

  const keith = await prisma.user.create({
    data: {
      auth0Id: "auth0|670c2ae65c7290eef380b6d3",
      name: "Keith Jamie Hardy",
      email: "keithjnrhardy@gmail.com",
      phone: "07860562492",
      role: "Admin",
      clients: {
        connect: faker.helpers
          .arrayElements(clients, 3)
          .map((client: { id: any }) => ({ id: client.id })),
      },
    },
  });

  const users = await Promise.all(
    Array.from({ length: 50 }).map(() =>
      prisma.user.create({
        data: {
          auth0Id: `auth0|${faker.string.alphanumeric({
            length: 10,
            case: "lower",
          })}`,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: `07${faker.string.numeric(9)}`,
          role: faker.helpers.arrayElement([
            "Admin",
            "Manager",
            "Planner",
            "Operative",
            "Client",
          ]),
          clients: {
            connect: faker.helpers
              .arrayElements(clients, 3)
              .map((client: { id: any }) => ({ id: client.id })),
          },
        },
      })
    )
  );

  const electricalInstallationConditionReports = await Promise.all(
    Array.from({ length: 50 }).map(() => {
      const property = faker.helpers.arrayElement(properties);

      return prisma.electricalInstallationConditionReport.create({
        data: {
          serial: `EICR${faker.string.numeric(9)}`,
          status: faker.helpers.arrayElement([
            "Draft",
            "Submitted",
            "Rejected",
            "Completed",
          ]),
          creator: {
            connect: { id: faker.helpers.arrayElement(users).id },
          },
          client: {
            connect: { id: property.clientId },
          },
          property: {
            connect: { id: property.id },
          },
        },
      });
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
