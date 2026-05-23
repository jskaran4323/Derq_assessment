import CountryTrafficChart from "../components/CountryTrafficChart";
import VehicleDistributionChart from "../components/VehicleDistributionChart";
import "./dashboard.css";

export default function DashBoard() {
  return (
    <div className="dashboard">
      <h1>Traffic Dashboard</h1>

      <div className="charts-container">
        <div className="chart-card">
          <CountryTrafficChart />
        </div>

        <div className="chart-card">
          <VehicleDistributionChart />
        </div>
      </div>
    </div>
  );
}