import { useState } from "react";
import { useWebContext } from "../web-context";
import "./gen-form-style.css";

interface GenFormConfigProps {
  modulo: string;
}

const config_options = {
  comisiones: ["Empleados", "Sueldo", "CalcularMP"],
  mensualidad: ["Meta", "Dias"],
};




type ConfigKey = keyof typeof config_options;

/* =========================
  HELPERS
========================= */

const formatNumber = (value: number | "") =>
  value === "" ? "" : new Intl.NumberFormat("es-AR").format(value);

const parseNumber = (value: string) =>
  value.replace(/\./g, "");

/* =========================
  COMPONENTE
========================= */

const GenFormConfig = ({ modulo }: GenFormConfigProps) => {
  const {
    setEMPLEADOS,
    setSUELDOS,
    setMETA,
    setDIAS,
    MP,
    setMP,
  } = useWebContext();

  /* =========================
    CONTEXTO DEL MÓDULO
  ========================= */

  const context = Object.keys(config_options).find((key) =>
    key.toLowerCase().includes(modulo.toLowerCase())
  ) as ConfigKey | undefined;

  const fields = context ? config_options[context] : [];

  /* =========================
    ESTADOS LOCALES
  ========================= */

  const [empleados, setEmpleados] = useState(0);
  const [sueldos, setSueldos] = useState<number[]>([]);
  const [values, setValues] = useState<Record<string, number | "">>({});

  /* =========================
    MAPA DE SETTERS
  ========================= */

  const setterMap: Record<string, (value: number) => void> = {
    Meta: setMETA,
    Dias: setDIAS,
  };

  /* =========================
    HANDLERS
  ========================= */

  const handleEmpleadosChange = (num: number | "") => {
    if (num === "") {
      setValues((prev) => ({ ...prev, Empleados: num }));
      setEmpleados(0);
      setSUELDOS([]);
      setSueldos([]);
      return;
    }

    // Limitar a máximo 6 empleados
    const cantidad = Math.min(Number(num), 6);

    setValues((prev) => ({ ...prev, Empleados: cantidad }));
    const base = Array(cantidad).fill(0);

    setEMPLEADOS(cantidad);
    setSUELDOS(base);
    setSueldos(base);
  };


  const handleSueldoChange = (index: number, value: number) => {
    const copy = [...sueldos];
    copy[index] = value;

    setSueldos(copy);
    setSUELDOS(copy);
  };

  /* =========================
    RENDER
  ========================= */

  return (
    <>
      {fields.map((item) => {
        /* -------- EMPLEADOS -------- */
        if (item === "Empleados") {
          return (
            <label key={item} className="column">
              <span className="f2">Empleados</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatNumber(values["Empleados"] ?? "")}
                onChange={(e) => {
                  const raw = parseNumber(e.target.value);
                  let num: number | "" = raw === "" ? "" : Number(raw);

                  // Limitar a máximo 6
                  if (typeof num === "number" && num > 6) num = 6;

                  if (num === "" || !isNaN(num)) {
                    handleEmpleadosChange(num);
                  }
                }}
              />


            </label>
          );
        }

        /* -------- SUELDOS -------- */
        if (item === "Sueldo" && empleados > 0) {
          return (
            <div key={item} className="column g1">
              {Array.from({ length: empleados }).map((_, index) => (
                <label key={index} className="column mt-1">
                  <span className="f2">Empleado {index + 1}</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(sueldos[index] ?? "")}
                    onChange={(e) => {
                      const raw = parseNumber(e.target.value);
                      const num = raw === "" ? 0 : Number(raw);

                      if (!isNaN(num)) {
                        handleSueldoChange(index, num);
                      }
                    }}
                  />
                </label>
              ))}
            </div>
          );
        }

        /* -------- SWITCH MP (EXCEPCIÓN) -------- */
        if (item === "CalcularMP") {
          return (
            <label key={item} className="switch-container">
              <span className="f2">Calcular MercadoPago</span>
              <div className="switch">
                <input
                  type="checkbox"
                  checked={MP}
                  onChange={(e) => setMP(e.target.checked)}
                />
                <span className="slider" />
              </div>
            </label>
          );
        }

        /* -------- INPUT NUMÉRICO GENÉRICO -------- */
        if (item in setterMap) {
          return (
            <label key={item} className="column">
              <span className="f2">{item}</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder={item}
                value={formatNumber(values[item] ?? "")}
                onChange={(e) => {
                  const raw = parseNumber(e.target.value);
                  const num = raw === "" ? "" : Number(raw);

                  if (num === "" || !isNaN(num)) {
                    setValues((prev) => ({ ...prev, [item]: num }));
                    if (num !== "") setterMap[item](num);
                  }
                }}
              />
            </label>
          );
        }

        return null;
      })}
    </>
  );
};

export default GenFormConfig;
