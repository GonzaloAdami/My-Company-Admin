import { useState, useEffect } from "react";
import { useWebContext } from "../../web-context";
import calculadora_comisiones from "../../comision-formulas";
import "./calculadora-style.css";

const Calculadora = () => {
  const {
    LOCAL,
    META,
    DIAS,
    EMPLEADOS,
    MP,
    COMISIONES,
    setCOMISIONES,
  } = useWebContext();
  ;

  const [showMenu, setShowMenu] = useState(false);
  const [totalBombas, setTotalBombas] = useState(0);
  const [comisiones, setComisiones] = useState<number | "">("");
  const [extras, setExtras] = useState<number | "">("");
  const [ventas, setVentas] = useState<number | "">("");
  const [saved, setSaved] = useState(false);
  /* 🔹 MP / LP */
  const [mpValue, setMpValue] = useState<number | "">("");
  const [lpValue, setLpValue] = useState<number | "">("");
  const [errorLocal, setErrorLocal] = useState(false);

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

  /* =========================
     DERIVADOS
  ========================= */

  const empleados = EMPLEADOS ?? 1;
  const dias = DIAS ?? 31;

  const metaMensual = META;
  const metaDiaria = metaMensual
    ? Math.ceil(metaMensual / dias)
    : null;



  const totalComisiones = Number(comisiones) || 0;
  const totalExtras = Number(extras) || 0;

  const totalFinal =
    totalBombas + (totalComisiones + totalExtras) * empleados;

  const llegaMetaDiaria =
    metaDiaria !== null && ventas !== "" ? ventas >= metaDiaria : false;

  const tarjeta =
    mpValue !== "" && lpValue !== ""
      ? Math.abs(lpValue - mpValue)
      : null;



  /* =========================
     HELPERS
  ========================= */

  const formatNumber = (value: number | "") =>
    value === "" ? "" : value.toLocaleString("es-AR");

  const parseNumber = (value: string) =>
    Number(value.replace(/\D/g, ""));

  useEffect(() => {
  if (LOCAL) setErrorLocal(false);
}, [LOCAL]);

  /* =========================
     HANDLERS
  ========================= */

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
    if (!LOCAL) {
      setErrorLocal(true);

      // auto hide del error
      setTimeout(() => setErrorLocal(false), 7500);
      return;
    }

    if (value.trim() === "") {
      setVentas("");
      setComisiones("");
      return;
    }

    const numericValue = parseNumber(value);
    setVentas(numericValue);
    newComisiones(numericValue);
  };

  const handleExtrasChange = (value: string) => {
    if (value.trim() === "") {
      setExtras("");
      return;
    }

    setExtras(parseNumber(value));
  };

  const parseNumberOrEmpty = (value: string): number | "" => {
    const raw = value.replace(/\D/g, "");
    return raw === "" ? "" : Number(raw);
  };

  const handleGuardarComisiones = () => {
    const baseComisiones = Number(comisiones) || 0;
    const baseExtras = Number(extras) || 0;
    const baseBombas = totalBombas;
    const bonoMeta = llegaMetaDiaria ? 900 : 0;

    const totalAGuardar =
      baseComisiones +
      baseExtras +
      baseBombas +
      bonoMeta;

    if (totalAGuardar === 0) return;

    setCOMISIONES([...COMISIONES, totalAGuardar]);
  };

  const handleResetFormulario = () => {
    setVentas("");
    setComisiones("");
    setExtras("");
    setTotalBombas(0);
    setMpValue("");
    setLpValue("");
    setShowMenu(false);
    setSaved(false);
  };


  /* =========================
     RENDER
  ========================= */

  return (
    <section className="form column g1 p1">
      {errorLocal && (
        <div className="alerta-local">
          Debes seleccionar un local para obtener las comisiones
        </div>
      )}

      <header className="calculadora-header">
        <h1>Comisiones de {LOCAL || "Local no seleccionado"}</h1>

        {/* META */}
        {metaMensual && (
          <article className="meta float g1">
            <h2 className="txt-stats bg-txt-externo">
              Meta mensual:
              <span style={{ color: "rgb(82, 189, 243)" }}>
                ${metaMensual.toLocaleString()}
              </span>
            </h2>

            <span className="txt-stats bg-txt-externo">
              Meta diaria:
              <span style={{ color: "rgb(82, 243, 174)" }}>
                ${metaDiaria!.toLocaleString("es-AR")}
              </span>
            </span>
          </article>
        )}

        <main className="body-comisiones column g1">
          {/* BOMBAS */}
          <article className={`bombas ${showMenu ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="select-bomb"
            >
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

                    <span className="txt">
                      ${bomba.value.toLocaleString()}
                    </span>

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

          {/* STATS */}
          <main className="stats">
            <span className="txt-stats bg-txt">
              Total Bombas:
              <span style={{ color: "rgb(82, 189, 243)" }}>
                ${totalBombas.toLocaleString()}
              </span>
            </span>

            <span className="txt-stats bg-txt">
              Total Comisiones:
              <span style={{ color: "rgb(82, 189, 243)" }}>
                ${totalComisiones.toLocaleString()}
              </span>
            </span>

            <span className="txt-stats bg-txt">
              Total Extras:
              <span style={{ color: "rgb(82, 189, 243)" }}>
                ${totalExtras.toLocaleString()}
              </span>
            </span>

            {llegaMetaDiaria ?
              <>
                <span className="txt-stats bg-txt">
                  Promedio diario:
                  <span style={{ color: "rgb(82, 243, 174)" }}>
                    900
                  </span>
                </span>
                <div className="column g1">
                  <span className="txt-stats bg-txt">
                    Total Final:
                    <span style={{ color: "rgb(82, 243, 174)" }}>
                      ${(totalFinal + (900 * empleados)).toLocaleString()}
                    </span>
                  </span>
                </div>
              </> :
              <span className="txt-stats bg-txt">
                Total Final:
                <span style={{ color: "rgb(82, 243, 174)" }}>
                  ${totalFinal.toLocaleString()}
                </span>
              </span>}

            {/* 🔹 TARJETA */}
            {MP && tarjeta !== null && (
              <span className="txt-stats bg-txt">
                Tarjeta:
                <span style={{ color: "rgb(82, 189, 243)" }}>
                  ${tarjeta.toLocaleString()}
                </span>
              </span>
            )}
          </main>
        </main>

        <div>
          <strong>
            Total Ventas :
            <span style={{ color: "rgb(82, 243, 174)" }}>
              ${ventas.toLocaleString()}
            </span>
            {metaDiaria && (
              <span style={{ marginLeft: "8px", color: llegaMetaDiaria ? "green" : "red", }} >
                {llegaMetaDiaria ?
                  <span className="true">META</span>
                  :
                  <span className="false">META</span>
                }
              </span>
            )}
          </strong>
        </div>

        <div style={{ marginTop: "8px" }}>
          <div style={{ marginTop: "8px", display: "flex", gap: "1em" }}>
            <button
              className={`btn-w ${saved ? "btn-saved" : ""}`}
              style={{ maxWidth: "30em" }}
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
                handleGuardarComisiones();
              }}
            >
              Guardar Comisiones
            </button>

            <button
              className="btn-w"
              style={{ maxWidth: "30em", backgroundImage: "linear-gradient(to left, rgb(86, 1, 1), rgb(142, 2, 2))", color: "aliceblue" }}
              onClick={handleResetFormulario}
            >
              Limpiar formulario
            </button>
          </div>



        </div>

      </header>

      {/* INPUTS */}
      <footer className="calculadora-footer">
        <label className="column g1 title">
          <span className="txt">Ventas</span>
          <input
            className={`bg-dark ${errorLocal ? "input-error vibrar" : ""}`}
            type="text"
            value={formatNumber(ventas)}
            onChange={(e) => handleVentasChange(e.target.value)}
          />

        </label>

        <label className="column g1">
          <span className="txt">Extras</span>
          <input
            className="bg-dark"
            type="text"
            value={formatNumber(extras)}
            onChange={(e) => handleExtrasChange(e.target.value)}
          />
        </label>

        {/* 🔹 MP / LP */}
        {MP && (
          <>
            <label className="column g1">
              <span className="txt">MP</span>
              <input
                className="bg-dark"
                type="text"
                value={formatNumber(mpValue)}
                onChange={(e) =>
                  setMpValue(parseNumberOrEmpty(e.target.value))
                }
              />

            </label>

            <label className="column g1">
              <span className="txt">LP</span>
              <input
                className="bg-dark"
                type="text"
                value={formatNumber(lpValue)}
                onChange={(e) =>
                  setLpValue(parseNumberOrEmpty(e.target.value))
                }
              />

            </label>
          </>
        )}
      </footer>
    </section>
  );
};

export default Calculadora;
