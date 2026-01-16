import { useState } from "react";
import WebContext from '../../context/context.json';
const Calculadora = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [totalBombas, setTotalBombas] = useState(0);
  const [comisiones, setComisiones] = useState<number | "">("");
  const [extras, setExtras] = useState<number | "">("");

  const bombas = [
    { value: 60000, premio: 2000 },
    { value: 80000, premio: 3500 },
    { value: 120000, premio: 4500 },
    { value: 150000, premio: 6000 },
    { value: 180000, premio: 8500 },
    { value: 220000, premio: 10500 },
    { value: 250000, premio: 12500 },
    { value: 280000, premio: 14500 },
  ];

  const totalComisiones = Number(comisiones) || 0;
  const totalExtras = Number(extras) || 0;
  const totalFinal = totalBombas + totalComisiones + totalExtras;

  return (
    <section className="column g1 p1">
      <header>
        <h1>Comisiones de {WebContext.LOCAL}</h1>
        <main className="body-comisiones column g1">
          <span>Comisiones :</span>

          <label>
            Bombas :
            <button type="button" onClick={() => setShowMenu(!showMenu)}>
              Seleccionar
            </button>

            {showMenu &&
              bombas.map((bomba) => (
                <article key={bomba.value} className="float g1 p1">
                  <button
                    type="button"
                    onClick={() =>
                      setTotalBombas(prev => prev + bomba.premio)
                    }
                  >
                    +
                  </button>

                  <span>${bomba.value.toLocaleString()}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setTotalBombas(prev =>
                        Math.max(0, prev - bomba.premio)
                      )
                    }
                  >
                    -
                  </button>
                </article>
              ))}
          </label>

          <span>Total Bombas: ${totalBombas.toLocaleString()}</span>
          <span>Total Comisiones: ${totalComisiones.toLocaleString()}</span>
          <span>Total Extras: ${totalExtras.toLocaleString()}</span>

          <span>
            <strong>Total Final: ${totalFinal.toLocaleString()}</strong>
          </span>
        </main>
      </header>

      <footer>
        <label>
          Comisiones
          <input
            type="number"
            value={comisiones}
            placeholder="Ingrese comisiones"
            onChange={(e) =>
              setComisiones(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>

        <label>
          Extras
          <input
            type="number"
            value={extras}
            placeholder="Ingrese extras"
            onChange={(e) =>
              setExtras(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>
      </footer>
    </section>
  );
};

export default Calculadora;
