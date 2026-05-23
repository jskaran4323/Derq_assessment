import { useEffect, useState } from "react";
import { useTraffic } from "../hooks/trafficData";
import { PieChart } from "@mui/x-charts/PieChart";

export default function VehicleByCountry() {
  const {
    countryData,
    vehicleData,
    getCountryData,
    getVehicleByCountry
  } = useTraffic();

  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    getCountryData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getVehicleByCountry(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (countryData.length > 0 && !selectedCountry) {
      setSelectedCountry(countryData[0].countryId);
    }
  }, [countryData]);

  return (
    <div>
      <h2>Vehicle Distribution by Country</h2>
      <PieChart
        series={[
          {
            data: vehicleData.map((item: any, index: number) => ({
              id: index,
              value: item.total,
              label: item.vehicleType
            }))
          }
        ]}
        height={300}
      />
      <select
        value={selectedCountry || ""}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>

        {countryData.map((c: any) => (
          <option key={c.country} value={c.countryId || c.id}>
            {c.country}
          </option>
        ))}
      </select>
    </div>
  );
}