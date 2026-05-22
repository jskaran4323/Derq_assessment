
import { useTrafficStore } from "../store/trafficDataStore";
import { trafficDataApi } from "../api/trafficData.api";

export const useTraffic = () => {
  const store = useTrafficStore();
  //const navigate = useNavigate();

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

  const getBreakdown =async () => {
    store.setLoading(true);
    store.setError(null);

    try {
      const response = await trafficDataApi.trafficDataBreakDown();
      store.setBreakdown(response.data);
      console.log(response.data);
      
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch breakdown";
      store.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      store.setLoading(false);
    }
  }

  return {
    countryData: store.countryData,
    vehicleData: store.vehicleData,
    breakdown: store.breakdown,
    isLoading: store.isLoading,
    error: store.error,

    getCountryData,
    getVehicleData,
    getBreakdown,

    clearError: () => store.setError(null),
    reset: () => store.reset()
  };
};