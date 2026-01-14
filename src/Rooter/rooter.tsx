import { useRoutes } from "react-router-dom";

import About from "../Components/about/about-component";
import Home from "../Components/Home/home-component";

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
        path: "*",
        element: <p>404 Not Found</p>
        },
        {
        path: "/test",
        element: <p>Hola mundo</p>
        }
    ]);

  return routes;

}

export default Router;