import { useEffect } from "react";
import { useTraffic } from "../hooks/trafficData";


export default function DashBoard() {
  const { breakdown, getBreakdown } = useTraffic();

  useEffect(() => {
    getBreakdown();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Breakdown Test</h2>

      <pre>
        {JSON.stringify(breakdown, null, 2)}
      </pre>
    </div>
  );
}