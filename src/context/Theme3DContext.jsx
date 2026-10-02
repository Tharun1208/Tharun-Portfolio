import { createContext, useContext, useState, useEffect } from "react";

const Theme3DContext = createContext();

export const MODES_3D = [
  {
    id: "spatial",
    name: "Spatial Studio",
    subtitle: "Linear & Apple Glassmorphism with Hologram Nodes",
    badge: "Recommended",
    icon: "💎",
  },
  {
    id: "room",
    name: "3D Developer Room",
    subtitle: "360° Interactive Studio with Desk & Server Rack",
    badge: "Interactive",
    icon: "🖥️",
  },
  {
    id: "laptop",
    name: "3D Cyber Laptop",
    subtitle: "Floating 3D MacBook with Live Terminal",
    badge: "Tech Pro",
    icon: "💻",
  },
  {
    id: "galaxy",
    name: "3D Particle Galaxy",
    subtitle: "Cinematic WebGL Star Vortex & Cyber Sphere",
    badge: "Sci-Fi",
    icon: "🌌",
  },
];

export function Theme3DProvider({ children }) {
  const [activeMode, setActiveMode] = useState(() => {
    return localStorage.getItem("tharun_3d_mode") || "spatial";
  });

  const setMode = (modeId) => {
    setActiveMode(modeId);
    localStorage.setItem("tharun_3d_mode", modeId);
  };

  return (
    <Theme3DContext.Provider value={{ activeMode, setMode, modes: MODES_3D }}>
      {children}
    </Theme3DContext.Provider>
  );
}

export const useTheme3D = () => useContext(Theme3DContext);
