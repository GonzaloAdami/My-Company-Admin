import { Link } from "react-router-dom";
import BD from "./card-bd.json";
import "./card-style.css";

const Card = () => {
  return (
    <>
      {BD.map((data) => (
        <article key={data.path} className="card">
          <header
            className="card-header"
            style={{ backgroundImage: `url(${data.imagen})` }}
          />

          <footer className="card-footer">
            <h2>{data.title}</h2>
            <span>{data.description}</span>

            <Link to={`/${data.path}`}>
              <button
                className="btn-w"
                style={{ marginTop: "2em", maxWidth: "40em" }}
              >
                Ver {data.categoria}
              </button>
            </Link>
          </footer>
        </article>
      ))}
    </>
  );
};

export default Card;
