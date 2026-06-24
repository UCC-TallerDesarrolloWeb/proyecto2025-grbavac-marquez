import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@styles/main.scss";
import Layout from "@components/Layout";
import { ThemeProvider } from "@context/ThemeContext";
import Home from "@pages/Home";
import Buscador from "@pages/Buscador";
import BuenosAires from "@pages/cities/BuenosAires";
import Cordoba from "@pages/cities/Cordoba";
import Mendoza from "@pages/cities/Mendoza";
import Misiones from "@pages/cities/Misiones";
import Salta from "@pages/cities/Salta";
import Tucuman from "@pages/cities/Tucuman";
import Ushuaia from "@pages/cities/Ushuaia";
import Bariloche from "@pages/cities/Bariloche";
import Activities from "@pages/Activities";
import Contact from "@pages/Contact";
import Register from "@pages/Register";
import NotFound from "@pages/NotFound";

const App = () => (
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="buscador" element={<Buscador />} />
          <Route path="buenos-aires" element={<BuenosAires />} />
          <Route path="cordoba" element={<Cordoba />} />
          <Route path="mendoza" element={<Mendoza />} />
          <Route path="misiones" element={<Misiones />} />
          <Route path="salta" element={<Salta />} />
          <Route path="tucuman" element={<Tucuman />} />
          <Route path="ushuaia" element={<Ushuaia />} />
          <Route path="bariloche" element={<Bariloche />} />
          <Route path="actividades" element={<Activities />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="registrarse" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
