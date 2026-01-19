import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WebProvider } from "./web-context";
import "./index.css";

import Loading from "./Module/Loading/loading";

// 👇 lazy imports
const Router = lazy(() => import("./Rooter/rooter"));
const Navbar = lazy(() => import("./Module/Navbar/navbar-module"));

import navdate from "./Module/Navbar/navbar-bd.json";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WebProvider>
        <Suspense fallback={<Loading />}>
          <main className="column g1">
            <Navbar BODY_NAVBAR={navdate} />
            <Router />
          </main>
        </Suspense>
      </WebProvider>
    </BrowserRouter>
  </StrictMode>
);
