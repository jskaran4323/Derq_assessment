
import { useTrafficStore } from "../store/trafficDataStore";
import { trafficDataApi } from "../api/trafficData.api";

export const useTraffic = () => {
  const store = useTrafficStore();
  const getCountryData = async () => {
    store.setLoading(true);
    store.setError(null);

    try {
      const response = await trafficDataApi.getTrafficDataByCountry();
      store.setCountryData(response.data);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch country data";
      store.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      store.setLoading(false);
    }
  }

  const getVehicleData =async () => {
    store.setLoading(true);
    store.setError(null);
    try {
      const response = await trafficDataApi.getTrafficDataByVehicle();
      store.setVehicleData(response.data);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch vehicle data";
      store.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      store.setLoading(false);
    }
  };

  return {
    countryData: store.countryData,
    vehicleData: store.vehicleData,
   
    isLoading: store.isLoading,
    error: store.error,

    getCountryData,
    getVehicleData,
   
    clearError: () => store.setError(null),
    reset: () => store.reset()
  };
};