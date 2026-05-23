import { prisma } from "../../prisma";
import { CreateTrafficDto, UpdateTrafficDto, UpsertTrafficDto } from "../../types/traffic.dto";
import { TrafficData, Country } from "@prisma/client";

export class TrafficService {
  async findAll() {
    const data = await prisma.trafficData.findMany({
      include: {
        country: true
      }
    });

    return data.map((t: TrafficData & { country: Country }) => ({
      id: t.id,
      country: t.country.name,
      type: t.type,
      count: t.count,
      recordedAt: t.recordedAt
    }));
  }
  

  async getByCountry() {
    const rows = await prisma.trafficData.groupBy({
      by: ['countryId'],
      _sum: { count: true },
      orderBy: { _sum: { count: 'desc' } }
    });

    const countries = await prisma.country.findMany();

    const countryMap = Object.fromEntries(
      countries.map(c => [c.id, c.name])
    );

    return rows.map((r: (typeof rows)[number]) => ({
      countryId: r.countryId,
      country: countryMap[r.countryId],
      total: r._sum.count ?? 0
    }));
  }

  async getVehicleByCountry(countryId: string) {
    const rows = await prisma.trafficData.groupBy({
      by: ['type'],
      where: { countryId },
      _sum: { count: true }
    });
  
    return rows.map((r: (typeof rows)[number]) => ({
      vehicleType: r.type,
      total: r._sum.count ?? 0
    }));
  }

  async create(data: CreateTrafficDto) {
    const traffic = await prisma.trafficData.create({
      data: {
        countryId: data.countryId,
        type: data.vehicleType,
        count: data.count,
        recordedAt: data.recordedAt
      }
    });

    return traffic;
  }

  async update(id: string, updateData: UpdateTrafficDto) {
    try {
      const updated = await prisma.trafficData.update({
        where: { id },
        data: updateData
      });

      return updated;
    } catch {
      throw new Error("Traffic record not found");
    }
  }

  async upsert(data: UpsertTrafficDto) {
    return prisma.trafficData.upsert({
      where: {
        countryId_type: {
          countryId: data.countryId,
          type: data.vehicleType
        }
      },
      update: {
        count: data.count,
        recordedAt: new Date()
      },
      create: {
        countryId: data.countryId,
        type: data.vehicleType,
        count: data.count,
        recordedAt: new Date()
      }
    });
  }

  async delete(id: string) {
    try {
      await prisma.trafficData.delete({ where: { id } });
      return { message: "Traffic record deleted", id };
    } catch {
      throw new Error("Traffic record not found");
    }
  }
}