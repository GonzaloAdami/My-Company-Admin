import './error-style.css';

const Error = () => {
    return(
        <section className="error-section">
            <main className="error-box column g1 p1">
                <img src="https://seosherpa.com/wp-content/uploads/2020/11/404-error-page_transparent-1024x549.png" alt="" className="error-img" />
                <span className="error-msj flex center">Error 404</span>
                <span className="error-txt flex center" style={{transform: "translateY(-10em)"}}>Oooh oooh!, Parece que hubo un error en la pagina :( </span>
            </main>
        </section>
    );
};

export default Error;