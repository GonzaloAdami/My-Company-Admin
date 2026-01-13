import { useState } from "react";
import "./navbar-style.css";

interface NavbarOption {
  name: string;
  list: string[];
}

interface Props {
  BODY_NAVBAR: {
    options: NavbarOption[];
    icon: string;
  };
}

const Navbar = ({ BODY_NAVBAR }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* icono hamburguesa */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <span />
        <span />
        <span />
      </button>

      {/* menú desplegable */}
      <div className={`menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="menu-grid">
          {BODY_NAVBAR.options.map((item, index) => (
            <div className="menu-section" key={index}>
              <h4>{item.name}</h4>
              <ul>
                {item.list.map((list, i) => (
                  <li key={i}>{list}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      
      <input type="text" className="navbar-input"/>
    </nav>
  );
};

export default Navbar;
