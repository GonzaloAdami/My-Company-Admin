import { useState, useMemo, useEffect } from "react";
import "../Register/register-style.css";

const formatNumber = (value: number) =>
    value.toLocaleString("es-AR");

const parseNumber = (value: string) =>
    Number(value.replace(/\./g, ""));

interface GenProps {
    data: number[];
    setData: (value: number[]) => void;
    storageKey: string;

    meta?: number;
    dias?: number;
    label?: string;
    title?: string;
}

const GenCards = ({
    data,
    setData,
    meta,
    label = "Valor del día",
    title = "VALOR",
}: GenProps) => {
    const safeData = Array.isArray(data) ? data : [];

    const [input, setInput] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);

    /* ---------------- TOTAL ---------------- */

    const total = useMemo(
        () => safeData.reduce((a, b) => a + b, 0),
        [safeData]
    );

    const hasMeta = typeof meta === "number" && meta > 0;
    const [showMetaWarning, setShowMetaWarning] = useState(true);


    useEffect(() => {
        if (!hasMeta && showMetaWarning) {
            const timer = setTimeout(() => {
                setShowMetaWarning(false);
            }, 5000);

            const handleClick = () => {
                setShowMetaWarning(false);
            };

            window.addEventListener("click", handleClick);

            return () => {
                clearTimeout(timer);
                window.removeEventListener("click", handleClick);
            };
        }
    }, [hasMeta, showMetaWarning]);

    /* ---------------- HELPERS ---------------- */

    const getMetaClass = (acumulado: number) => {
        if (!hasMeta) return "no-meta";
        return acumulado >= meta! ? "true" : "false";
    };


    const getPorcentajeClass = (value: number | null) => {
        if (value === null) return "";
        return value >= 0 ? "true" : "false";
    };

    

    /* ---------------- CRUD ---------------- */

    const handleSave = () => {
        if (!input) return;

        const value = parseNumber(input);
        if (isNaN(value)) return;

        let nuevaData: number[];

        if (editIndex !== null) {
            nuevaData = [...safeData];
            nuevaData[editIndex] = value;
            setEditIndex(null);
        } else {
            nuevaData = [...safeData, value];
        }

        setData(nuevaData);
        setInput("");
    };

    const handleDelete = (index: number) => {
        setData(safeData.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
        setInput(formatNumber(safeData[index]));
        setEditIndex(index);
    };

    /* ---------------- RENDER ---------------- */

    return (
        <section
            className="column g1 center section-cards"
            style={{ marginTop: "2em" }}
        >
            {!hasMeta && showMetaWarning && (
                <div className="meta-warning">
                    Para ver las comparaciones de meta debés agregar una <b>meta</b> y{" "}
                    <b>días</b> en <b>Mensualidad &gt; Configuración</b>
                </div>
            )}


            {/* INPUT */}
            <main className="column g1" style={{ marginBottom: "2em" }}>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder={label}
                    value={input}
                    onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        setInput(
                            raw ? Number(raw).toLocaleString("es-AR") : ""
                        );
                    }}
                    style={{ width: "50vw" }}
                />

                <button onClick={handleSave} className="btn">
                    {editIndex !== null ? "Modificar" : "Guardar"}
                </button>
            </main>

            {/* TOTAL */}
            {safeData.length > 0 && (
                <article className="column g1 p1 register-card-body">
                    <span className="txt title">
                        Total :{" "}
                        <span className={getMetaClass(total)}>
                            {formatNumber(total)}
                        </span>
                    </span>
                </article>
            )}

            {/* LISTA */}
            {safeData.map((item, index) => {
                const anterior = safeData[index - 1];

                let porcentaje: number | null = null;
                if (index > 0 && anterior !== 0) {
                    porcentaje = ((item - anterior) / anterior) * 100;
                }

                const acumuladoHastaHoy = safeData
                    .slice(0, index + 1)
                    .reduce((a, b) => a + b, 0);

                return (
                    <article
                        key={index}
                        className="column g1 p1 register-card-body"
                    >
                        <header className="header-card-header">
                            <span className="txt title">
                                {title} :{" "}
                                <span className={getMetaClass(acumuladoHastaHoy)}>
                                    {formatNumber(item)}
                                </span>
                            </span>

                            <span className="txt title">
                                DÍA :{" "}
                                <span className="registro-dia">
                                    {index + 1}
                                </span>
                            </span>

                            <span className={getPorcentajeClass(porcentaje)}>
                                {porcentaje === null ? (
                                    <span className="true">Primer día</span>
                                ) : (
                                    `${porcentaje > 0 ? "+" : ""}${porcentaje.toFixed(
                                        2
                                    )}%`
                                )}
                            </span>
                        </header>

                        <footer className="float g1">
                            <button
                                onClick={() => handleEdit(index)}
                                className="btn-w"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="btn-w"
                            >
                                Borrar
                            </button>
                        </footer>
                    </article>
                );
            })}
        </section>
    );
};

export default GenCards;
