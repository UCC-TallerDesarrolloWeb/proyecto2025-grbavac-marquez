import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";

const Layout = () => {
  return (
    <div className="app">
      <header className="app-header">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
