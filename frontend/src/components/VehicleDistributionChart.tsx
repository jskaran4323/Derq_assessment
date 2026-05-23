import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect } from "react";
import { useTraffic } from "../hooks/trafficData";

export default function VehicleDistributionChart() {
  const { vehicleData, getVehicleData } = useTraffic();

  useEffect(() => {
    getVehicleData();
  }, []);

  return (
    <>
      <h2>Vehicle Distribution</h2>

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
    </>
  );
}