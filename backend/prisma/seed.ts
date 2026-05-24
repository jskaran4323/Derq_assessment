import { PrismaClient, VehicleType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const recordedAt = new Date("2026-05-01");

  const canada = await prisma.country.upsert({
    where: { name: "Canada" },
    update: {},
    create: {
      name: "Canada",
      trafficData: {
        create: [
          {
            type: VehicleType.CAR,
            count: 1200,
            recordedAt,
          },
          {
            type: VehicleType.TRUCK,
            count: 300,
            recordedAt,
          },
          {
            type: VehicleType.BIKE,
            count: 500,
            recordedAt,
          },
        ],
      },
    },
  });

  const usa = await prisma.country.upsert({
    where: { name: "USA" },
    update: {},
    create: {
      name: "USA",
      trafficData: {
        create: [
          {
            type: VehicleType.CAR,
            count: 5000,
            recordedAt,
          },
          {
            type: VehicleType.BUS,
            count: 800,
            recordedAt,
          },
          {
            type: VehicleType.TRUCK,
            count: 1500,
            recordedAt,
          },
        ],
      },
    },
  });

  const uk = await prisma.country.upsert({
    where: { name: "UK" },
    update: {},
    create: {
      name: "UK",
      trafficData: {
        create: [
          {
            type: VehicleType.BIKE,
            count: 900,
            recordedAt,
          },
          {
            type: VehicleType.CAR,
            count: 2100,
            recordedAt,
          },
          {
            type: VehicleType.BUS,
            count: 400,
            recordedAt,
          },
        ],
      },
    },
  });

  

  console.log("Seed completed:", {
    canada: canada.name,
    usa: usa.name,
    uk: uk.name,
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });