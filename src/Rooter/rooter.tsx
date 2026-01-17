import { useRoutes } from "react-router-dom";

import About from "../Components/about/about-component";
import Home from "../Components/Home/home-component";
import Configuracion from "../Module/configuracion/configuracion-plantilla-modulo";
import Calculadora from "../Module/Calculadora/calculadora-component";
const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: ":modulo/Configuracion",
      element: <Configuracion />
    },
    {
      path: "*",
      element: <p>404 Not Found</p>
    },
    {
      path: ":modulo/Calculadora",
      element: <Calculadora />
    }
  ]);

  return routes;
}

export default Router;
