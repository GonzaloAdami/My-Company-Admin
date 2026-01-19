import { useParams } from "react-router-dom";
import { useState } from "react";
import GenFormConfig from "../../system/gen-form-config";
import { useWebContext } from "../../web-context";

const Configuracion = () => {
  const { modulo } = useParams<{ modulo: string }>();
  const { setLOCAL } = useWebContext();

  const [saved, setSaved] = useState(false);

  const localFromStorage = localStorage.getItem("LOCAL") || "";

  if (!modulo) {
    return <p>Módulo inválido</p>;
  }

  const handleSave = () => {
    setSaved(true);

    // 🔊 sonido de verificación
    const audio = new Audio("/sounds/success.mp3");
    audio.volume = 0.4;
    audio.play();

    // volver al estado normal
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="flex p1 column">
      <header>
        <h1>{modulo}</h1>
        <p className="mt-1">
          Local actual:{" "}
          <strong>{localFromStorage || "Local no seleccionado"}</strong>
        </p>
      </header>

      <main>
        <form className="flex g1 p1 mw-30 column">
          <label className="column">
            <span className="f2">Local</span>
            <select
              name="Locales"
              defaultValue={localFromStorage}
              onChange={(e) => setLOCAL(e.target.value)}
            >
              <option value="F1 / F2 / Cabildo">F1 / F2 / Cabildo</option>
              <option value="F3">F3</option>
            </select>
          </label>

          <GenFormConfig modulo={modulo} />
        </form>
      </main>

      <footer className="flex p1">
        <button
          type="button"
          onClick={handleSave}
          className={`btn ${saved ? "btn-saved" : ""}`}
        >
          Guardar
        </button>
      </footer>
    </section>
  );
};

export default Configuracion;
