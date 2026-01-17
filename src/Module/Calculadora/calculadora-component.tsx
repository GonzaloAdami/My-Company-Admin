import { useState } from "react";
import { useWebContext } from "../../web-context";
import calculadora_comisiones from "../../comision-formulas";
import "./calculadora-style.css";

const Calculadora = () => {
  const {
    LOCAL,
    META,
    DIAS,
    EMPLEADOS,
  } = useWebContext();

  const [showMenu, setShowMenu] = useState(false);
  const [totalBombas, setTotalBombas] = useState(0);
  const [comisiones, setComisiones] = useState<number | "">("");
  const [extras, setExtras] = useState<number | "">("");
  const [ventas, setVentas] = useState<number | "">("");

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

  // 🔹 Valores derivados
  const empleados = EMPLEADOS ?? 1;
  const dias = DIAS ?? 31;

  const metaMensual = META;
  const metaDiaria = metaMensual ? metaMensual / dias : null;

  const totalComisiones = Number(comisiones) || 0;
  const totalExtras = Number(extras) || 0;
  const totalFinal = totalBombas + ((totalComisiones + totalExtras) * empleados);

  const llegaMetaDiaria =
    metaDiaria !== null && ventas !== "" ? ventas >= metaDiaria : false;

  const newComisiones = (ventas: number) => {
    const resultado = calculadora_comisiones(ventas, LOCAL);
    setVentas(ventas);
    if (typeof resultado === "number") {
      setComisiones(resultado);
    } else {
      setComisiones("");
    }
  };

  const handleVentasChange = (value: string) => {
    // borra todo → input vacío
    if (value.trim() === "") {
      setVentas("");
      setComisiones("");
      return;
    }

    const numericValue = Number(value.replace(/\D/g, ""));
    setVentas(numericValue);
    newComisiones(numericValue);
  };


  const formatNumber = (value: number | "") =>
    value === "" ? "" : value.toLocaleString("es-AR");

  const handleExtrasChange = (value: string) => {
    if (value.trim() === "") {
      setExtras("");
      return;
    }

    const numericValue = Number(value.replace(/\D/g, ""));
    setExtras(numericValue);
  };


  return (
    <section className="form column g1 p1">
      <header className="calculadora-header">
        <h1>Comisiones de {LOCAL || "Local no seleccionado"}</h1>

        {/* 🔹 META */}
        {metaMensual && (
          <article className="meta float g1">
            <h2 className="txt-stats bg-txt-externo">Meta mensual: <span style={{ color: "rgb(82, 189, 243)" }}>${metaMensual.toLocaleString()}</span></h2>
            <span className="txt-stats bg-txt-externo">Meta diaria: <span style={{ color: "rgb(82, 243, 174)" }}>${metaDiaria!.toLocaleString()}</span></span>
          </article>
        )}

        <main className="body-comisiones column g1">


          {/* 🔹 BOMBAS */}
          <article className={`bombas ${showMenu ? "open" : ""}`}>
            

              <button type="button" onClick={() => setShowMenu(!showMenu)} className="select-bomb">
                Seleccionar las bombas
              </button>
              <main className="bombas-column">
                  
              {showMenu &&
                bombas.map((bomba) => (
                  <article key={bomba.value} className="float g1 p1 bomb-item">
                    <button
                      type="button"
                      className="btn-add"
                      onClick={() =>
                        setTotalBombas((prev) => prev + bomba.premio)
                      }
                    >
                      +
                    </button>

                    <span className="txt">${bomba.value.toLocaleString()}</span>

                    <button
                      type="button"
                      className="btn-add"
                      onClick={() =>
                        setTotalBombas((prev) =>
                          Math.max(0, prev - bomba.premio)
                        )
                      }
                    >
                      -
                    </button>
                  </article>
                ))}
              </main>
           

          </article>

          <main className="stats">
            <span className="txt-stats bg-txt">Total Bombas: <span style={{ color: "rgb(82, 189, 243)" }}>${totalBombas.toLocaleString()}</span></span>

            {EMPLEADOS !== null && EMPLEADOS > 1 ? (
              <>
                <span className="txt-stats bg-txt">
                  Total Comisiones (Individual): <span style={{ color: "rgb(82, 189, 243)" }}>${totalComisiones.toLocaleString()}
                  </span></span>
                <span className="txt-stats bg-txt">
                  Total Comisiones (Grupal): <span style={{ color: "rgb(82, 189, 243)" }}>${(totalComisiones * (empleados)).toLocaleString()}
                  </span></span>
              </>
            ) : (

              <span className="txt-stats bg-txt">
                Total Comisiones: <span style={{ color: "rgb(82, 189, 243)" }}>${totalComisiones.toLocaleString()}
                </span></span>
            )}



            <span className="txt-stats bg-txt">Total Extras: <span style={{ color: "rgb(82, 189, 243)" }}>${totalExtras.toLocaleString()}</span></span>

            {/* 🔹 TOTAL FINAL + META */}
            
              {llegaMetaDiaria ?
                <>
                  <span className="txt-stats bg-txt">Promedio diario: <span style={{ color: "rgb(82, 243, 174)" }}>900</span></span>
                  <div className="column g1">

                    <span className="txt-stats bg-txt">Total Final: <span style={{ color: "rgb(82, 243, 174)" }}>${(totalFinal + (900 * empleados)).toLocaleString()}</span></span>
                  </div>
                    </>:
                  <span className="txt-stats bg-txt">Total Final: <span style={{ color: "rgb(82, 243, 174)" }}>${totalFinal.toLocaleString()}</span></span>
               
              }


          </main>

        </main>
        <div>
          <strong>Total Ventas:<span style={{ color: "rgb(82, 243, 174)" }}> ${ventas.toLocaleString()}</span></strong>
             {metaDiaria && (
                <span
                  style={{
                    marginLeft: "8px",
                    color: llegaMetaDiaria ? "green" : "red",
                  }}
                >
                  {llegaMetaDiaria
                    ? <span className="true">META</span>
                    : <span className="false">META</span>
                  }
                </span>
              )}
        </div>
      </header>

      <footer className="calculadora-footer">
        <label className="column g1 title">
          <span className="txt"> Comisiones </span>
          <input
            className="bg-dark"
            type="text"
            value={formatNumber(ventas)}
            placeholder="Ingrese ventas"
            onChange={(e) => handleVentasChange(e.target.value)}
          />

        </label>

        <label className="column g1">
          <span className="txt"> Extras </span>
          <input
          className="bg-dark"
            type="text"
            value={formatNumber(extras)}
            placeholder="Ingrese extras"
            onChange={(e) => handleExtrasChange(e.target.value)}
          />

        </label>
      </footer>
    </section>
  );
};

export default Calculadora;
