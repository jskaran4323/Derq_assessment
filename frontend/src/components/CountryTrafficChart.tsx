
import { useEffect, useState } from "react";
import { useTraffic } from "../hooks/trafficData";
import { LineChart } from "@mui/x-charts";

export default function CountryTrafficChart() {
  const { countryData, getCountryData, isLoading, error } = useTraffic();

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <>
      <h2>Country-wise Traffic</h2>
      <LineChart
        xAxis={[
          {
            scaleType: "band",
            data: countryData.map((item: any) => item.country),
            label:"Countries"
          }
        ]}
        series={[
          {
            data: countryData.map((item: any) => item.total),
            label: "Traffic"
          }
        ]}
        height={300}
      />
    </>
  );
}