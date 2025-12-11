import React, { useState } from "react";
import "./Heatmap.css";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// Path to your India geojson file
const geoUrl = "/data/india.geojson";

// Sample heatmap values by state (replace with real values later)
const sampleHeatData = {
  Maharashtra: 22000,
  Karnataka: 15000,
  Tamil_Nadu: 13000,
  Kerala: 8000,
  Gujarat: 9000,
  Delhi: 18000,
  Uttar_Pradesh: 20000,
  West_Bengal: 14000,
  Madhya_Pradesh: 8000,
  Punjab: 21000,
  Odisha: 17000,
  Jharkhan: 18000,
};

const Heatmap = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  // Function to get color based on value
  const getColor = (value) => {
    if (!value) return "#EEE"; // no data
    if (value > 18000) return "#08306b";
    if (value > 12000) return "#2171b5";
    if (value > 8000) return "#6baed6";
    return "#c6dbef";
  };

  return (
    <div className="heatmap-container">
      <h2 className="heatmap-title">State-wise Awareness Heat Map</h2>
      <p className="heatmap-subtitle">
        Color indicates reported cases / awareness index. Hover a state for details.
      </p>
      
      <div className="heatmap-content">
        {/* Map Section */}
        <div className="heatmap-map">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 600,
              center: [82, 22], // centers India
            }}
            width={380}
            height={450}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.st_nm || geo.properties.NAME;
                  const value = sampleHeatData[stateName] || 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getColor(value)}
                      onMouseEnter={() =>
                        setTooltipContent(`${stateName}: ${value}`)
                      }
                      onMouseLeave={() => setTooltipContent("")}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#f59e0b", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Sidebar Section */}
        <div className="heatmap-sidebar">
          <h3 className="sidebar-title">Hover Details</h3>
          <p className="sidebar-text">
            {tooltipContent || "Hover a state to see details."}
          </p>

          <h4 className="sidebar-subtitle">Legend (approx.)</h4>
          <div className="legend-box">
            <div className="legend-color" style={{ background: "#c6dbef" }}></div>
            <div className="legend-color" style={{ background: "#6baed6" }}></div>
            <div className="legend-color" style={{ background: "#2171b5" }}></div>
            <div className="legend-color" style={{ background: "#08306b" }}></div>
          </div>

          <button className="btn-report">Report Cybercrime</button>
          <button className="btn-guidance">Get Guidance</button>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
