import { createContext, useContext, useEffect, useState } from "react";

/* =========================
   TIPOS
========================= */

interface WebContextType {
  LOCAL: string;
  setLOCAL: (value: string) => void;

  META: number | null;
  setMETA: (value: number | null) => void;

  COMISIONES: number[];
  setCOMISIONES: (value: number[]) => void;

  EMPLEADOS: number | null;
  setEMPLEADOS: (value: number | null) => void;

  SUELDOS: number[];
  setSUELDOS: (value: number[]) => void;

  DIAS: number | null;
  setDIAS: (value: number | null) => void;

  MENSUALIDAD: number | null;
  setMENSUALIDAD: (value: number | null) => void;

  MP: boolean;
  setMP: (value: boolean) => void;

  REGISTRO: number[];
  setREGISTRO: (value: number[]) => void;
}

/* =========================
   CONTEXT
========================= */

const WebContext = createContext<WebContextType | null>(null);

/* =========================
   HELPERS
========================= */

const getString = (key: string): string =>
  localStorage.getItem(key) || "";

const getNumber = (key: string): number | null => {
  const value = localStorage.getItem(key);
  return value !== null ? Number(value) : null;
};

const getArray = (key: string): number[] => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
};

const getBoolean = (key: string): boolean =>
  localStorage.getItem(key) === "true";

/* =========================
   PROVIDER
========================= */

export const WebProvider = ({ children }: { children: React.ReactNode }) => {
  const [LOCAL, setLOCAL] = useState(() => getString("LOCAL"));
  const [META, setMETA] = useState<number | null>(() => getNumber("META"));

 const [COMISIONES, setCOMISIONES] = useState<number[]>(() => {
  const saved = localStorage.getItem("COMISIONES");
  try {
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
});


  const [EMPLEADOS, setEMPLEADOS] = useState<number | null>(() =>
    getNumber("EMPLEADOS")
  );

  const [SUELDOS, setSUELDOS] = useState<number[]>(() =>
    getArray("SUELDOS")
  );

  const [DIAS, setDIAS] = useState<number | null>(() =>
    getNumber("DIAS")
  );

  const [MENSUALIDAD, setMENSUALIDAD] = useState<number | null>(() =>
    getNumber("MENSUALIDAD")
  );

  const [MP, setMP] = useState<boolean>(() => getBoolean("MP"));

  const [REGISTRO, setREGISTRO] = useState<number[]>(() =>
    getArray("REGISTRO")
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
  localStorage.setItem(
    "COMISIONES",
    JSON.stringify(COMISIONES)
  );
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

  useEffect(() => {
    localStorage.setItem("MP", MP.toString());
  }, [MP]);

  useEffect(() => {
    localStorage.setItem("REGISTRO", JSON.stringify(REGISTRO));
  }, [REGISTRO]);

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
        MP,
        setMP,
        REGISTRO,
        setREGISTRO,
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
