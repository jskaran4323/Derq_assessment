import { VehicleType } from "../enums/vehicle.enum";

export interface CreateTrafficDto {
  countryId:     string;
  vehicleType: VehicleType;
  count:         number;
  recordedAt:    Date;
}

export interface UpdateTrafficDto {
  count?:      number;
  recordedAt?: Date;
}

export interface UpsertTrafficDto {
  countryId:     string;
  vehicleType: VehicleType;
  count:         number;
}