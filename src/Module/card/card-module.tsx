import BD from './card-bd.json';
import './card-style.css'
const Card = () => {
  return (
    <>
      {BD.map((data, index) => (
        <article key={index} className="card">
          <header
            className="card-header"
            style={{ backgroundImage: `url(${data.imagen})` }}
          />

          <footer className="card-footer">
            <h2>{data.title}</h2>
            <span>{data.description}</span>
            <button style={{ marginTop: "2em" }}>
              Ir a {data.categoria}
            </button>
          </footer>
        </article>
      ))}
    </>
  );
};

export default Card;
