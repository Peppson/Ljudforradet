import { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';
import { Row, Col } from 'react-bootstrap';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled ? "header scrolled" : "header"}>
      <Row>
        <Col>
          <div className='container'>
            <div className="d-flex align-items-center justify-content-between">

              <div className='p-3'>
                <Link to="/" className="text-decoration-none">
                  <div className="d-flex">
                    <div className="pe-2">
                      <Logo />
                    </div>
                    <h2>Ljudförrådet</h2>
                  </div>
                </Link>
              </div>

              <nav>
                {routes
                  .filter(x => x.menuLabel)
                  .map(({ menuLabel, path }, i) =>
                    <NavLink
                      className="p-3 text-decoration-none"
                      key={i}
                      to={path}>{menuLabel}
                    </NavLink>)}
              </nav>
            </div>
          </div>
        </Col>
      </Row >
    </header >
  );
}
