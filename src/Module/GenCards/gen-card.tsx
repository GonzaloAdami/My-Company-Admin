import { useState, useEffect } from "react";
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
    storageKey,
    meta,
    dias,
    label = "Valor del día",
    title = "VALOR",
}: GenProps) => {
    const safeData = Array.isArray(data) ? data : [];

    const [input, setInput] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);

    /* ---------------- TOTAL ---------------- */

    const total = safeData.reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(total));
    }, [total, storageKey]);

    /* ---------------- HELPERS ---------------- */

    const getClass = (value: number | null) => {
        if (value === null) return "";
        return value >= 0 ? "true" : "false";
    };

    const getVentasClass = (value: number) => {
        if (!meta || !dias || dias === 0) return "";
        const promedioDiario = meta / dias;
        return value >= promedioDiario ? "true" : "false";
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
        <section className="column g1 center" style={{ marginTop: "2em" }}>
            {/* INPUT */}
            <main className="column g1" style={{ marginBottom: "2em" }}>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder={label}
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
            {safeData.length > 0 && (
                <article className="column g1 p1 register-card-body">
                    <span className="txt title">
                        Total :{" "}
                        <span className="true">
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

                return (
                    <article
                        key={index}
                        className="column g1 p1 register-card-body"
                    >
                        <header className="float g1 start">
                            <span className="txt title">
                                {title} :{" "}
                                <span className={getVentasClass(item)}>
                                    {formatNumber(item)}
                                </span>
                            </span>

                            <span className="txt title">
                                DÍA :{" "}
                                <span className="registro-dia">
                                    {index + 1}
                                </span>
                            </span>

                            <span className={getClass(porcentaje)}>
                                {porcentaje === null ? (
                                    <span className="true">Primer día</span>
                                ) : (
                                    `${porcentaje > 0 ? "+" : ""}${porcentaje.toFixed(2)}%`
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
