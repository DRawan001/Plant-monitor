import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 30000;

export default function App() {
  const [watering, setWatering] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${API}/api/status`);
      setWatering(res.data.watering);
    } catch (err) {
      console.error("Status error:", err.message);
    }
  };

  const toggleWatering = async () => {
    try {
      const res = await axios.post(`${API}/api/toggle`);
      setWatering(res.data.watering);
    } catch (err) {
      console.error("Toggle error:", err.message);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          
          {/* ON / OFF BUTTON */}
          <button
            onClick={toggleWatering}
            className={`px-6 py-2 rounded font-bold ${
              watering ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {watering ? "ON" : "OFF"}
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* STATUS TEXT */}
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold">
            {watering
              ? "Watering the plants"
              : "Watering off"}
          </h1>
        </div>

      </div>
    </div>
  );
}
