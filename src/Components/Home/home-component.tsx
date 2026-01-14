import About from "../about/about-component";
import Card from "../../Module/card/card-module";


const Home = () => {
    return (
        <main>
            <header>
                <About />
            </header>
            <footer className='card-container'>
                <Card />
            </footer>
        </main>
    );
}

export default Home;