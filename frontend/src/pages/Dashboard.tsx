import Footer from "../components/common/Footer";
import Navbar from "../components/common/NavBar";
import CountryTrafficChart from "../components/CountryTrafficChart";
import VehicleDistributionChart from "../components/VehicleDistributionChart";
import trafficImg from "../assets/derq.webp";
import "../css/dashboard.css";
import { useTrafficStore } from "../store/trafficDataStore";

export default function DashBoard() {
  const { error } = useTrafficStore();
  return (

    <>
    <Navbar />
    <div className="dashboard">
      <h1>Traffic Dashboard</h1>
       
      {error && (
          <div className="error-box">
            {error}
          </div>
        )}

      <div className="charts-container">
        <div className="chart-card">
          <CountryTrafficChart />
        </div>

        <div className="chart-card">
          <VehicleDistributionChart />
        </div>
      </div>
      <img src={trafficImg} alt="traffic" />
    </div>
    <Footer/>
    </>
  );
}