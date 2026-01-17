import { createContext, useContext, useEffect, useState } from "react";

/* =========================
   TIPOS
========================= */

interface WebContextType {
  LOCAL: string;
  setLOCAL: (value: string) => void;

  META: number | null;
  setMETA: (value: number | null) => void;

  COMISIONES: number | null;
  setCOMISIONES: (value: number | null) => void;

  EMPLEADOS: number | null;
  setEMPLEADOS: (value: number | null) => void;

  SUELDOS: number[];
  setSUELDOS: (value: number[]) => void;

  DIAS: number | null;
  setDIAS: (value: number | null) => void;

  MENSUALIDAD: number | null;
  setMENSUALIDAD: (value: number | null) => void;
}

/* =========================
   CONTEXT
========================= */

const WebContext = createContext<WebContextType | null>(null);

/* =========================
   HELPERS
========================= */

const getString = (key: string) =>
  localStorage.getItem(key) || "";

const getNumber = (key: string): number | null => {
  const value = localStorage.getItem(key);
  return value !== null ? Number(value) : null;
};

const getArray = (key: string): number[] => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
};

/* =========================
   PROVIDER
========================= */

export const WebProvider = ({ children }: { children: React.ReactNode }) => {
  /* -------- STATES -------- */

  const [LOCAL, setLOCAL] = useState<string>(() => getString("LOCAL"));
  const [META, setMETA] = useState<number | null>(() => getNumber("META"));
  const [COMISIONES, setCOMISIONES] = useState<number | null>(() =>
    getNumber("COMISIONES")
  );
  const [EMPLEADOS, setEMPLEADOS] = useState<number | null>(() =>
    getNumber("EMPLEADOS")
  );
  const [SUELDOS, setSUELDOS] = useState<number[]>(() =>
    getArray("SUELDOS")
  );
  const [DIAS, setDIAS] = useState<number | null>(() => getNumber("DIAS"));
  const [MENSUALIDAD, setMENSUALIDAD] = useState<number | null>(() =>
    getNumber("MENSUALIDAD")
  );

  /* -------- LOCAL STORAGE -------- */

  useEffect(() => {
    localStorage.setItem("LOCAL", LOCAL);
  }, [LOCAL]);

  useEffect(() => {
    META !== null
      ? localStorage.setItem("META", META.toString())
      : localStorage.removeItem("META");
  }, [META]);

  useEffect(() => {
    COMISIONES !== null
      ? localStorage.setItem("COMISIONES", COMISIONES.toString())
      : localStorage.removeItem("COMISIONES");
  }, [COMISIONES]);

  useEffect(() => {
    EMPLEADOS !== null
      ? localStorage.setItem("EMPLEADOS", EMPLEADOS.toString())
      : localStorage.removeItem("EMPLEADOS");
  }, [EMPLEADOS]);

  useEffect(() => {
    localStorage.setItem("SUELDOS", JSON.stringify(SUELDOS));
  }, [SUELDOS]);

  useEffect(() => {
    DIAS !== null
      ? localStorage.setItem("DIAS", DIAS.toString())
      : localStorage.removeItem("DIAS");
  }, [DIAS]);

  useEffect(() => {
    MENSUALIDAD !== null
      ? localStorage.setItem("MENSUALIDAD", MENSUALIDAD.toString())
      : localStorage.removeItem("MENSUALIDAD");
  }, [MENSUALIDAD]);

  /* -------- PROVIDER -------- */

  return (
    <WebContext.Provider
      value={{
        LOCAL,
        setLOCAL,
        META,
        setMETA,
        COMISIONES,
        setCOMISIONES,
        EMPLEADOS,
        setEMPLEADOS,
        SUELDOS,
        setSUELDOS,
        DIAS,
        setDIAS,
        MENSUALIDAD,
        setMENSUALIDAD,
      }}
    >
      {children}
    </WebContext.Provider>
  );
};

/* =========================
   HOOK
========================= */

export const useWebContext = () => {
  const context = useContext(WebContext);
  if (!context) {
    throw new Error("useWebContext debe usarse dentro de WebProvider");
  }
  return context;
};

export default WebContext;
