import type { VehicleType } from "./vehicle.enum"

export interface CountryData{
    countryId: string,
    country: string,
    total: number
}

export interface VehicleData{
    vehicleType: VehicleType
    total: number
}
export interface Breakdown{
    country: string,
    vehicleType: VehicleType
    count: number
}