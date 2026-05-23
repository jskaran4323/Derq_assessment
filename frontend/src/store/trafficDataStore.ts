import { create } from "zustand";
import type { Breakdown, CountryData, VehicleData } from "../types/trafficDataType";

type TrafficState = {
  countryData: CountryData[];
  vehicleData: VehicleData[];
  breakdown: Breakdown[];
  isLoading: boolean;
  error: string | null;

  setCountryData: (data: CountryData[]) => void;
  setVehicleData: (data: VehicleData[]) => void;
  setBreakdown: (data: Breakdown[]) => void;

  setLoading: (val: boolean) => void;
  setError: (val: string | null) => void;
  reset: () => void;
};

export const useTrafficStore = create<TrafficState>((set) => ({
  countryData: [],
  vehicleData: [],
  breakdown: [],
  isLoading: false,
  error: null,

  setCountryData: (data) => set({ countryData: data }),
  setVehicleData: (data) => set({ vehicleData: data }),
  setBreakdown: (data) => set({ breakdown: data }),

  setLoading: (val) => set({ isLoading: val }),
  setError: (val) => set({ error: val }),

  reset: () =>
    set({
      countryData: [],
      vehicleData: [],
      breakdown: [],
      isLoading: false,
      error: null
    })
}));