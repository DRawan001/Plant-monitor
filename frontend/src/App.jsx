import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const API = "https://plant-monitor-backend.onrender.com";

export default function App() {
  const [moisture, setMoisture] = useState({ A: 0, B: 0, C: 0 });
  const [systemOn, setSystemOn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Fetch moisture data
  const fetchMoisture = async () => {
    const res = await axios.get(`${API}/api/moisture`);
    setMoisture(res.data);
  };

  // Fetch system status
  const fetchStatus = async () => {
    const res = await axios.get(`${API}/api/status`);
    setSystemOn(res.data.status);
  };

  // Toggle system
  const toggleSystem = async () => {
    const res = await axios.post(`${API}/api/toggle`);
    setSystemOn(res.data.status);
  };

  useEffect(() => {
    fetchMoisture();
    fetchStatus();

    const interval = setInterval(fetchMoisture, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          
          {/* ON / OFF BUTTON */}
          <button
            onClick={toggleSystem}
            className={`px-6 py-2 rounded font-bold ${
              systemOn ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {systemOn ? "ON" : "OFF"}
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* PLANT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["A", "B", "C"].map((plant) => (
            <div
              key={plant}
              className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center"
            >
              <h2 className="text-xl font-bold mb-4">Plant {plant}</h2>
              <p className="text-3xl font-semibold">
                {moisture[plant]} %
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Soil Moisture Level
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
