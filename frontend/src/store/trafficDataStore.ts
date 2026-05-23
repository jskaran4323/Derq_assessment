import { create } from "zustand";
import type { CountryData, VehicleData } from "../types/trafficDataType";

type TrafficState = {
  countryData: CountryData[];
  vehicleData: VehicleData[];
  isLoading: boolean;
  error: string | null;

  setCountryData: (data: CountryData[]) => void;
  setVehicleData: (data: VehicleData[]) => void;
  setLoading: (val: boolean) => void;
  setError: (val: string | null) => void;
  reset: () => void;
};

export const useTrafficStore = create<TrafficState>((set) => ({
  countryData: [],
  vehicleData: [],
  isLoading: false,
  error: null,

  setCountryData: (data) => set({ countryData: data }),
  setVehicleData: (data) => set({ vehicleData: data }),
  setLoading: (val) => set({ isLoading: val }),
  setError: (val) => set({ error: val }),

  reset: () =>
    set({
      countryData: [],
      vehicleData: [],
      isLoading: false,
      error: null
    })
}));