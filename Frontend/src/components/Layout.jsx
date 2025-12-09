import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import useTheme from "@/hooks/useTheme";

export default function Layout() {
  const { theme, toggle } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Navbar />
        <div style={{ paddingRight: 16 }}>
          <button onClick={toggle} aria-label="Cambiar tema">
            Tema: {theme}
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
