import { useState, useEffect } from "react";
import { useWebContext } from "../../web-context";
import "../Register/register-style.css";

const formatNumber = (value: number) =>
  value.toLocaleString("es-AR");


const RegistroComisiones = () => {
  const { COMISIONES, setCOMISIONES } = useWebContext();
  const safeComisiones = Array.isArray(COMISIONES) ? COMISIONES : [];

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const parseNumber = (value: string) =>
    Number(value.replace(/\./g, ""));

  /* ---------------- TOTAL ---------------- */

  const totalComisiones = safeComisiones.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  useEffect(() => {
    localStorage.setItem(
      "COMISIONES",
      JSON.stringify(totalComisiones)
    );
  }, [totalComisiones]);

  /* ---------------- CRUD ---------------- */

  const handleSave = () => {
    if (!input) return;

    const numberValue = parseNumber(input);
    if (isNaN(numberValue)) return;

    if (editIndex !== null) {
      const copia = [...safeComisiones];
      copia[editIndex] = numberValue;
      setCOMISIONES(copia);
      setEditIndex(null);
    } else {
      setCOMISIONES([...safeComisiones, numberValue]);
    }

    setInput("");
  };

  const handleDelete = (index: number) => {
    setCOMISIONES(safeComisiones.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setInput(formatNumber(safeComisiones[index]));
    setEditIndex(index);
  };

  /* ---------------- CLASES ---------------- */

  const getClass = (value: number | null) => {
    if (value === null) return "";
    return value >= 0 ? "true" : "false";
  };

  /* ---------------- RENDER ---------------- */

  return (
    <section className="column g1 center" style={{ marginTop: "2em" }}>
      {/* INPUT */}
      <main className="column g1" style={{ marginBottom: "2em" }}>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Comisión del día"
          value={input}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            setInput(raw ? Number(raw).toLocaleString("es-AR") : "");
          }}
          style={{ width: "50vw" }}
        />

        <button onClick={handleSave} className="btn">
          {editIndex !== null ? "Modificar" : "Guardar"}
        </button>
      </main>

      {/* TOTAL */}
      <div className="register-card-body">
        <span className="title">
          Total del mes :{" "}
          <span className="true">
            {formatNumber(totalComisiones)}
          </span>
        </span>
      </div>

      {/* LISTA */}
      {safeComisiones.map((item, index) => {
        const anterior = safeComisiones[index - 1];

        let porcentaje: number | null = null;
        if (index > 0 && anterior !== 0) {
          porcentaje = ((item - anterior) / anterior) * 100;
        }

        return (
          <article key={index} className="column g1 p1 register-card-body">
            <header className="float g1 start">
              <span className="txt title">
                COMISIÓN :{" "}
                <span className="true">
                  {formatNumber(item)}
                </span>
              </span>

              <br />

              <span className="txt title">
                DÍA :{" "}
                <span className="registro-dia">{index + 1}</span>
              </span>

              <span
                className={getClass(porcentaje)}
                style={{ transform: "translate(10%, -10%)" }}
              >
                {porcentaje === null
                  ? <span className="true">Primer día</span>
                  : `${porcentaje > 0 ? "+" : ""}${porcentaje.toFixed(2)}%`}
              </span>
            </header>

            <footer className="float g1">
              <button onClick={() => handleEdit(index)} className="btn-w">
                Editar
              </button>
              <button onClick={() => handleDelete(index)} className="btn-w">
                Borrar
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default RegistroComisiones;
