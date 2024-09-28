import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Header.css';

function Header() {
  const location = useLocation();
  const isBuilderPage = location.pathname === '/Builder';
  const isDesktopPage = location.pathname === '/Desktop';
  const isLaptopPage = location.pathname === '/Laptop';
  const isBenchmarkPage = location.pathname === '/Benchmark';
  const isContactPage = location.pathname === '/Contact';
  let text;

  if (isBuilderPage) {
    text = 'Builder';
  } else if (isDesktopPage) {
    text = 'Desktops';
  } else if (isLaptopPage) {
    text = 'Laptops'; }
  else if (isBenchmarkPage) {
    text = 'Benchmark';
  } else if (isContactPage) {
    text = 'Contact Us';
  }

  return (
    <div className="full-width-banner text-center">
      <h2 className="display-4">{text}</h2>
    </div>
  );
}

export default Header;
