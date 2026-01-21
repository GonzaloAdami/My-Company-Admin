import './about-style.css';
import BD from './about-bd.json';
import { Link } from "react-router-dom";

const About = () => {


  return (
    <section className="section-about">
      {BD.map((item, index) => (<>


        <div className="about-item" key={index}>
          <h1 className="about-title">{item.title}</h1>
          <span className="text-about">{item.descripcion}</span>

        </div>
        <Link to="/Comisiones/Calculadora">
          <button
            className="txt btn-w"
            style={{ marginTop: "1em", fontSize: "1.5em" }}
          >
            Comenzar
          </button>
        </Link>
      </>
      ))}
    </section>
  );
};

export default About;
