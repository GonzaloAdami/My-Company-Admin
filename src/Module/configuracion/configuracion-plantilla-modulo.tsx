import { useParams } from "react-router-dom";
import GenFormConfig  from "../../system/gen-form-config";




const Configuracion = () => {
  const { modulo } = useParams<{ modulo: string }>();

  if (!modulo) {
    return <p>Módulo inválido</p>;
  }



  return (
    <section className="flex p1 column">
      <header>
        <h1>{modulo}</h1>
      </header>

      <main>
        <form className="flex g1 p1 mw-30 column">
          
          <GenFormConfig modulo={modulo} />

        </form>
      </main>

      <footer className="flex p1">
       
        <button type="submit">Guardar</button>
      </footer>
    </section>
  );
};

export default Configuracion;
