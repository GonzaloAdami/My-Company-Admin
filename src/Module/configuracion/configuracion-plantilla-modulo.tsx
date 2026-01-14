interface FormItem {
  id: string;
  label: string;
  type: string;
  name: string;
}

interface ConfiguracionProps {
  title: string;
  formulario: FormItem[];
}


const Configuracion = ({ title, formulario }: ConfiguracionProps) => {
  return (
    <section>
      <header>
        <h1>{title}</h1>
      </header>

      <main>
        <form>
          {formulario.map((item, index) => (
            <div key={index}>
              <label htmlFor={item.id}>
                <span>{item.label}</span>
                <input
                  type={item.type}
                  id={item.id}
                  name={item.name}
                />
              </label>
            </div>
          ))}
        </form>
      </main>

      <footer>
        <button type="button">Cerrar</button>
        <button type="submit">Guardar</button>
      </footer>
    </section>
  );
};

export default Configuracion;
