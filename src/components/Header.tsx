import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav, ButtonGroup, Dropdown } from "react-bootstrap";
import routes from "../routes";
import Logo from "./logo";
import config from "../config/Config";
import { useAuth } from "../context/AuthProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, logoutUser } = useAuth();
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled || isExpanded ? "header scrolled" : "header"}>
      <Navbar expanded={isExpanded} expand="md" variant="dark">
        <Container className="d-flex justify-content-between align-items-center">

          <div className="p-3">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex">
                <div className="pe-2">
                  <Logo />
                </div>
                <h2>{config.appName}</h2>
              </div>
            </Link>
          </div>

          <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {routes.filter(x => x.menuLabel)
                .filter(route => {
                  const path = route.path.toLowerCase();
                  // Hide /login if user is logged in
                  if (path === "/login" && user)
                    return false;
                  return true;
                })

                .map(
                  ({ menuLabel, path }, i) =>
                    <Nav.Link
                      as={Link}
                      key={i}
                      to={path}
                      className={`${isActive(path) ? 'navLinkActive' : ''} text-white ps-3 fs-5`}
                      onClick={() => setTimeout(() => setIsExpanded(false), 100)}>
                      {menuLabel}
                    </Nav.Link>
                )}

              {/* Display user dropdown if logged in */}
              {user ? (
                <>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      variant="link"
                      className="nav-link text-white ps-3 fs-5">
                      {user.firstName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      align="start"
                      className="background-color-overlay border-1 border-white">

                      {user.role === "admin" && (
                        <Dropdown.Item as={NavLink} to="/admin" className="text-white dropdown-menu-item">
                          Admin
                        </Dropdown.Item>
                      )}

                      <Dropdown.Item onClick={logoutUser} className="text-white dropdown-menu-item">
                        Logga ut
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : null}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
}
