
import { useTrafficStore } from "../store/trafficDataStore";
import { trafficDataApi } from "../api/trafficData.api";
import { getErrorMessage } from "../error/appError";


export const useTraffic = () => {
  const store = useTrafficStore();

  const getCountryData = async () => {
    store.setLoading(true);
    store.setError(null);

    try {
      const response = await trafficDataApi.getTrafficDataByCountry();
      store.setCountryData(response.data);
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      store.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      store.setLoading(false);
    }
  };

  const getVehicleByCountry = async (countryId: string) => {
    store.setLoading(true);
    store.setError(null);

    try {
      const response = await trafficDataApi.getVehicleByCountry(countryId);
      store.setVehicleData(response.data);
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
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
    getVehicleByCountry,

    clearError: () => store.setError(null),
    reset: () => store.reset(),
  };
};