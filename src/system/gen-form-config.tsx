import { useState } from "react";

interface GenFormConfigProps {
  modulo: string;
}

const config_options = {
  comisiones: ["Empleados", "Sueldo", "CalcularMP"],
  mensualidad: ["Meta", "Dias"]
};

type ConfigKey = keyof typeof config_options;

const GenFormConfig = ({ modulo }: GenFormConfigProps) => {


  const context = Object.keys(config_options).find(key =>
    key.toLowerCase().includes(modulo.toLowerCase())
  ) as ConfigKey | undefined;

  const fields = context ? config_options[context] : [];

  const [data, setData] = useState<Record<string, number>>({});

  const handleChange = (name: string, value: number) => {
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {fields.map((item) => (
        <label key={item}>
          <span>{item}</span>

          <input
            type="number"
            placeholder={item}
            onChange={e => handleChange(item, Number(e.target.value))}
          />
        </label>
      ))}
    </>
  );
};

export default GenFormConfig;
