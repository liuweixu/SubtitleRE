import "./styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppSemi from "./App_semiui.jsx";
import AppAntd from "./App_antd.jsx";
import { useState } from "react";

const { ipcRenderer } = window.require("electron");

function RootComponent() {
  const [theme, setTheme] = useState("semi-ui");

  ipcRenderer.on("switch-theme", (event, themeName) => {
    setTheme(themeName);
  });

  return (
    <StrictMode>{theme === "semi-ui" ? <AppSemi /> : <AppAntd />}</StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<RootComponent />);
