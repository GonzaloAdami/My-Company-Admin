import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar-style.css";

interface NavbarOption {
  id: number;
  name: string;
  list: string[];
}

interface Props {
  BODY_NAVBAR: {
    options: NavbarOption[];
    icon: string;
  };
}

const toPath = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-");

const Navbar = ({ BODY_NAVBAR }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  /* 🔹 NUEVO */
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* 🔹 NUEVO: mapear opciones */
  const searchMap = useMemo(() => {
    return BODY_NAVBAR.options.flatMap(option =>
      option.list.map(item => ({
        label: `${option.name} / ${item}`,
        path: `/${toPath(option.name)}/${toPath(item)}`
      }))
    );
  }, [BODY_NAVBAR]);

  /* 🔹 NUEVO: filtrar */
  const suggestions = search
    ? searchMap.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <nav className="navbar">

      {/* icono hamburguesa */}
      <button
        style={{ marginTop: "1em" }}
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <span />
        <span />
        <span />
      </button>

      {/* menú (NO TOCADO) */}
      <div className={`menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="menu-grid">
          {BODY_NAVBAR.options.map((item) => (
            <div className="menu-section" key={item.id}>
              <h4>{item.name}</h4>
              <ul>
                {item.list.map((listItem) => (
                  <a
                    key={`${item.name}-${listItem}`}
                    href={`/${item.name}/${listItem}`}
                  >
                    <li>{listItem}</li>
                  </a>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 INPUT (solo agregado) */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          className="navbar-input"
          value={search}
          placeholder="Buscar..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && suggestions.length > 0 && (
          <ul
          className="nav-input-menu"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              listStyle: "none",
              margin: 0,
              padding: 0,
              zIndex: 999,
              border: "1px solid #ddd"
            }}
          >
            {suggestions.map(item => (
              <li
              className="nav-input-item"
                key={item.path}
                style={{ padding: "0.5em", cursor: "pointer" }}
                onClick={() => {
                  navigate(item.path);
                  setSearch("");
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
