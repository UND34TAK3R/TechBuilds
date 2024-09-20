<<<<<<< HEAD
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
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
            <li className="nav-item">
              <Link className="nav-link active" to="PreBuilt">Pre Built</Link>
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
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form>
            <div className="d-flex flex-column">
                <Link to="signup" className="btn btn-outline-success mb-2" id='btn'>Sign Up</Link>
                <Link className="btn btn-outline-success" to="login" id='btn'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
=======
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
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
            <li className="nav-item">
              <Link className="nav-link active" to="PreBuilt">Pre Built</Link>
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
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form>
            <div className="d-flex flex-column">
                <Link to="signup" className="btn btn-outline-success mb-2" id='btn'>Sign Up</Link>
                <Link className="btn btn-outline-success" to="login" id='btn'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
>>>>>>> 980f8a2650164a2166e2b3a3eba3e9fc0fd69b65
