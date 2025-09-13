import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import routes from "../routes";
import Logo from "./logo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled || expanded ? "header scrolled" : "header"}>
      <Navbar expanded={expanded} expand="md" variant="dark">
        <Container className="d-flex justify-content-between align-items-center">

          <div className="p-3">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex">
                <div className="pe-2">
                  <Logo />
                </div>
                <h2>Ljudförrådet</h2>
              </div>
            </Link>
          </div>

          <Navbar.Toggle onClick={() => setExpanded(!expanded)} />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {routes.filter(x => x.menuLabel).map(
                ({ menuLabel, path }, i) =>
                  <Nav.Link
                    as={Link}
                    key={i}
                    to={path}
                    className="text-white ps-3"
                    onClick={() => setTimeout(() => setExpanded(false), 100)}>
                    {menuLabel}
                  </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
}
