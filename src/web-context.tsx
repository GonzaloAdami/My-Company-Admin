import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

/* =========================
   TIPOS
========================= */

interface WebContextType {
  LOCAL: string;
  setLOCAL: (value: string) => void;

  META: number;
  setMETA: (value: number) => void;

  COMISIONES: number[];
  setCOMISIONES: (value: number[]) => void;

  EMPLEADOS: number;
  setEMPLEADOS: (value: number) => void;

  SUELDOS: number[];
  setSUELDOS: (value: number[]) => void;

  DIAS: number;
  setDIAS: (value: number) => void;

  MENSUALIDAD: number;
  setMENSUALIDAD: (value: number) => void;

  MP: boolean;
  setMP: (value: boolean) => void;

  REGISTRO: number[];
  setREGISTRO: (value: number[]) => void;
}

/* =========================
   SAFE LOCAL STORAGE
========================= */

const storageAvailable = (): boolean => {
  try {
    const test = "__test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

const safeStorage = {
  get<T>(key: string, fallback: T): T {
    if (!storageAvailable()) return fallback;
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

 set(key: string, value: unknown) {
  if (!storageAvailable()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));

    // 🔍 DEBUG SEGURO
    const snapshot = STORAGE_KEYS.reduce((acc, k) => {
      const raw = localStorage.getItem(k);
      acc[k] = raw ? JSON.parse(raw) : null;
      return acc;
    }, {} as Record<string, unknown>);

    console.log("📦 localStorage (solo app):");
    console.table(snapshot);

  } catch (error) {
    console.error("❌ Error guardando en localStorage", error);
  }
}

};

const STORAGE_KEYS = [
  "LOCAL",
  "META",
  "COMISIONES",
  "EMPLEADOS",
  "SUELDOS",
  "DIAS",
  "MENSUALIDAD",
  "MP",
  "REGISTRO",
];


/* =========================
   CONTEXT
========================= */

const WebContext = createContext<WebContextType | null>(null);

/* =========================
   PROVIDER
========================= */

export const WebProvider = ({ children }: { children: ReactNode }) => {
  /* -------- DEFAULTS -------- */
  const [LOCAL, setLOCAL] = useState<string>(
    () => safeStorage.get("LOCAL", "")
  );

  const [META, setMETA] = useState<number>(
    () => safeStorage.get("META", 0)
  );

  const [COMISIONES, setCOMISIONES] = useState<number[]>(
    () => safeStorage.get("COMISIONES", [])
  );

  const [EMPLEADOS, setEMPLEADOS] = useState<number>(
    () => safeStorage.get("EMPLEADOS", 1)
  );

  const [SUELDOS, setSUELDOS] = useState<number[]>(
    () => safeStorage.get("SUELDOS", [])
  );

  const [DIAS, setDIAS] = useState<number>(
    () => safeStorage.get("DIAS", 31)
  );

  const [MENSUALIDAD, setMENSUALIDAD] = useState<number>(
    () => safeStorage.get("MENSUALIDAD", 0)
  );

  const [MP, setMP] = useState<boolean>(
    () => safeStorage.get("MP", false)
  );

  const [REGISTRO, setREGISTRO] = useState<number[]>(
    () => safeStorage.get("REGISTRO", [])
  );

  /* =========================
     PERSISTENCIA
  ========================= */

  useEffect(() => {
    safeStorage.set("LOCAL", LOCAL);
  }, [LOCAL]);

  useEffect(() => {
    safeStorage.set("META", META);
  }, [META]);

  useEffect(() => {
    safeStorage.set("COMISIONES", COMISIONES);
  }, [COMISIONES]);

  useEffect(() => {
    safeStorage.set("EMPLEADOS", EMPLEADOS);
  }, [EMPLEADOS]);

  useEffect(() => {
    safeStorage.set("SUELDOS", SUELDOS);
  }, [SUELDOS]);

  useEffect(() => {
    safeStorage.set("DIAS", DIAS);
  }, [DIAS]);

  useEffect(() => {
    safeStorage.set("MENSUALIDAD", MENSUALIDAD);
  }, [MENSUALIDAD]);

  useEffect(() => {
    safeStorage.set("MP", MP);
  }, [MP]);

  useEffect(() => {
    safeStorage.set("REGISTRO", REGISTRO);
  }, [REGISTRO]);

  /* =========================
     PROVIDER
  ========================= */

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
    throw new Error(
      "useWebContext debe usarse dentro de WebProvider"
    );
  }
  return context;
};

export default WebContext;
