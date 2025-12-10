import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/styles/main.scss";
import Layout from "@/components/Layout";
import Home from "@/components/Home";
import BuenosAires from "@/components/cities/BuenosAires";
import Cordoba from "@/components/cities/Cordoba";
import Mendoza from "@/components/cities/Mendoza";
import Misiones from "@/components/cities/Misiones";
import Salta from "@/components/cities/Salta";
import Tucuman from "@/components/cities/Tucuman";
import Ushuaia from "@/components/cities/Ushuaia";
import Bariloche from "@/components/cities/Bariloche";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";
import Register from "@/components/Register";
import NotFound from "@/components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
  );
}

export default App;
