import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TechBuilds</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Builder">Builder</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
               	to="prebuilt"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Prebuilt
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/">Desktops</Link></li>
                <li><Link className="dropdown-item" to="/">Laptops</Link></li>
              </ul>
	          </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Parts">Parts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Benchmark">Benchmark</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Contact">Contact</Link>
            </li>
          </ul>
          <form>
            <div className="d-flex flex-column">
                <Link to="/signup" className="btn btn-outline-success mb-2" id='btn'>Sign Up</Link>
                <Link className="btn btn-outline-success" to="/login" id='btn'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
