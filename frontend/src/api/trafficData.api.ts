import apiClient from "./api"

export const trafficDataApi = {
    getTrafficDataByCountry: () =>{
      return  apiClient.get("/traffic/by-country")
    },
    getVehicleByCountry: (countryId: string) => {
        return apiClient.get(`/traffic/vehicle/${countryId}`);
      }
    
}