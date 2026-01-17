import { useState } from "react";
import { useWebContext } from "../web-context";
interface GenFormConfigProps {
  modulo: string;
}

const config_options = {
  comisiones: ["Empleados", "Sueldo", "CalcularMP"],
  mensualidad: ["Meta", "Dias"]
};

type ConfigKey = keyof typeof config_options;

const GenFormConfig = ({ modulo }: GenFormConfigProps) => {

  const { setEMPLEADOS, setSUELDOS } = useWebContext();
  const context = Object.keys(config_options).find(key =>
    key.toLowerCase().includes(modulo.toLowerCase())
  ) as ConfigKey | undefined;

  const fields = context ? config_options[context] : [];

  const [empleados, setEmpleados] = useState(0);
  const [sueldos, setSueldos] = useState<number[]>([]);

  // 🔹 empleados
  const handleEmpleadosChange = (value: number) => {
    setEmpleados(value);
    setSueldos(Array(value).fill(0));

    setEMPLEADOS(value)
    setSUELDOS(Array(value).fill(0))
  };

  // 🔹 sueldo por empleado
  const handleSueldoChange = (index: number, value: number) => {
    const copy = [...sueldos];
    copy[index] = value;
    setSueldos(copy);
    setSUELDOS(copy)
    
    
    
  };

  return (
    <>
      {fields.map(item => {
        // INPUT EMPLEADOS
        if (item === "Empleados") {
          return (
            <label key={item} className="column">
              <span className="f2">Empleados</span>
              <input
                type="number"
                min={0}
                onChange={e => handleEmpleadosChange(Number(e.target.value))}
              />
            </label>
          );
        }

        // INPUT SUELDOS DINÁMICOS
        if (item === "Sueldo" && empleados > 0) {
          return (
            <div key={item} className="column g1">
              {Array.from({ length: empleados }).map((_, index) => (
                <label key={index} className="column mt-1">
                  <span className="f2">Empleado {index + 1}</span>
                  <input
                    type="number"
                    placeholder={`Sueldo Empleado ${index + 1}`}
                    onChange={e =>
                      handleSueldoChange(index, Number(e.target.value))
                    }
                  />
                </label>
              ))}
            </div>
          );
        }

        // INPUT NORMAL
        return (
          <label key={item} className="column">
            <span className="f2">{item}</span>
            <input
              type="number"
              placeholder={item}
            />
          </label>
        );
      })}
    </>
  );
};

export default GenFormConfig;
