import './about-style.css';
import BD from './about-bd.json';


const About = () => {


  return (
    <section className="section-about">
      {BD.map((item, index) => (<>
      
      
        <div className="about-item" key={index}>
          <h1 className="txt">{item.title}</h1>
          <span className="txt">{item.descripcion}</span>
          
        </div>
        <button className='txt' style={{marginTop: "1em"}}>Comenzar</button>
      </>
      ))}
    </section>
  );
};

export default About;
