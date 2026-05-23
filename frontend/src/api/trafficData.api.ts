import apiClient from "./api"

export const trafficDataApi = {
    getTrafficDataByCountry: () =>{
      return  apiClient.get("/traffic/by-country")
    },
    getTrafficDataByVehicle: () =>{
        return apiClient.get("/traffic/by-vehicle")
    }
    
}