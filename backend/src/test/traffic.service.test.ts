import { jest } from '@jest/globals';

const mockGroupBy = jest.fn<() => Promise<unknown>>();
const mockFindMany = jest.fn<() => Promise<unknown>>();

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    trafficData: { groupBy: mockGroupBy },
    country: { findMany: mockFindMany },
  })),
}));

const { TrafficService } = await import('../v1/services/traffic.service.js');

describe('TrafficService', () => {
  let service: InstanceType<typeof TrafficService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TrafficService();
  });

  it('getByCountry maps grouped rows with country names', async () => {
    mockGroupBy.mockResolvedValue([
      { countryId: '1738', _sum: { count: 10 } }
    ]);
    mockFindMany.mockResolvedValue([
      { id: '1738', name: 'Canada' }
    ]);

    const result = await service.getByCountry();

    expect(result).toEqual([
      { countryId: '1738', country: 'Canada', total: 10 }
    ]);
  });

  it('getVehicleByCountry returns vehicle totals for countryId', async () => {
    mockGroupBy.mockResolvedValue([
      { type: 'car', _sum: { count: 5 } }
    ]);

    const result = await service.getVehicleByCountry('1738');

    expect(result).toEqual([
      { vehicleType: 'car', total: 5 }
    ]);
  });
});