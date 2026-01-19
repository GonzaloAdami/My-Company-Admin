import { useState } from "react";
import { useWebContext } from "../../web-context";
import './register-style.css';

const formatNumber = (value: number) =>
    value.toLocaleString("es-AR");

const Register = () => {
    const { REGISTRO, setREGISTRO, META, DIAS } = useWebContext();


    const [input, setInput] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const parseNumber = (value: string) =>
        Number(value.replace(/\./g, ""));

    const handleSave = () => {
        if (!input) return;

        const numberValue = parseNumber(input);
        if (isNaN(numberValue)) return;

        if (editIndex !== null) {
            const copia = [...REGISTRO];
            copia[editIndex] = numberValue;
            setREGISTRO(copia);
            setEditIndex(null);
        } else {
            setREGISTRO([...REGISTRO, numberValue]);
        }

        setInput("");
    };

    const handleDelete = (index: number) => {
        setREGISTRO(REGISTRO.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
        setInput(formatNumber(REGISTRO[index]));
        setEditIndex(index);
    };

    const getClass = (value: number | null) => {
        if (value === null) return "";
        return value >= 0 ? "true" : "false";
    };

    const getVentasClass = (ventas: number) => {
    if (!META || !DIAS || DIAS === 0) return "";
    const promedio = META / DIAS;
    return ventas >= promedio ? "true" : "false";
};


    return (
        <section className="column g1 center " style={{marginTop: "2em"}}>
            {/* INPUT */}
            <main className="column g1" style={{marginBottom: "2em"}}>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Ventas del día"
                    value={input}
                    onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        setInput(raw ? Number(raw).toLocaleString("es-AR") : "");
                    }}
                    style={{width: "50vw"}}
                />
                <button onClick={handleSave} className="btn">
                    {editIndex !== null ? "Modificar" : "Guardar"}
                </button>
            </main>

            {/* LISTA */}
            {REGISTRO.map((item, index) => {
                const anterior = REGISTRO[index - 1];

                let porcentaje: number | null = null;
                if (index > 0 && anterior !== 0) {
                    porcentaje = ((item - anterior) / anterior) * 100;
                }

                return (
                    <article key={index} className="column g1 p1 register-card-body">
                        <header className="float g1 start">
                            <span className="txt title">
                                VENTAS : {" "}
                                <span className={getVentasClass(item)}>
                                    {formatNumber(item)}
                                </span>
                            </span>

                            <br />
                            <span className="txt title">DÍA : <span className="registro-dia">{index + 1}</span></span>
                        
                            <span className={getClass(porcentaje)} style={{transform: "translate(10% , -10%)"}}>
                                {" "}
                                {porcentaje === null
                                    ? <span className="true"> Primer Dia</span>
                                    : `${porcentaje > 0 ? "+" : ""}${porcentaje.toFixed(2)}%`}
                            </span>
                        </header>

                        <footer className="float g1">
                            <button onClick={() => handleEdit(index)} className="btn-w">Editar</button>
                            <button onClick={() => handleDelete(index)} className="btn-w">Borrar</button>
                        </footer>

                        
                    </article>
                );
            })}
        </section>
    );
};

export default Register;
