import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [watering, setWatering] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${API}/api/status`);
      setWatering(res.data.watering);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleWatering = async () => {
    try {
      const res = await axios.post(`${API}/api/toggle`);
      setWatering(res.data.watering);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="app">

      {/* TOP TITLE */}
      <header className="header">
        🌱 Plant Watering Control
      </header>

      {/* STATUS TEXT */}
      <div className="status-wrapper">
        <h2 className={`status-text ${watering ? "on-text" : "off-text"}`}>
          {watering ? "💧 Watering the plants" : "🚫 Watering off"}
        </h2>
      </div>

      {/* CENTER BUTTON */}
      <div className="button-wrapper">
        <button
          className={`circle-button ${watering ? "on" : "off"}`}
          onClick={toggleWatering}
        >
          {watering ? "ON" : "OFF"}
        </button>
      </div>

    </div>
  );
}
