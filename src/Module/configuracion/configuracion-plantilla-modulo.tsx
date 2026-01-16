import { useParams } from "react-router-dom";
import GenFormConfig  from "../../system/gen-form-config";




const Configuracion = () => {
  const { modulo } = useParams<{ modulo: string }>();

  if (!modulo) {
    return <p>Módulo inválido</p>;
  }



  return (
    <section>
      <header>
        <h1>{modulo}</h1>
      </header>

      <main>
        <form>
          
          <GenFormConfig modulo={modulo} />

        </form>
      </main>

      <footer>
       
        <button type="submit">Guardar</button>
      </footer>
    </section>
  );
};

export default Configuracion;
