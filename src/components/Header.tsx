import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav, ButtonGroup, Dropdown } from "react-bootstrap";
import { getTrimmedName } from "../utils/Utilities";
import { useCart } from "../context/ShoppingCartProvider";
import { useAuth } from "../context/AuthProvider";
import routes from "../routes";
import Logo from "./logo";
import config from "../config/Config";

export default function Header() {
  const { user, logoutUser } = useAuth();
  const { openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const allowedPaths = ["/", "/products", "/about-us", "/login"];
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  // Set header background on scroll from top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled || isExpanded ? "header scrolled" : "header"}>
      <Navbar
        expanded={isExpanded}
        expand="md"
        variant="dark">
        <Container className="d-flex justify-content-between align-items-center">

          <div className="p-3">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex">
                <div className="pe-2 ">
                  <Logo />
                </div>
                <h2 className="hidden-xs">{config.appName}</h2>
              </div>
            </Link>
          </div>

          <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {routes.filter(x => x.menuLabel)
                .filter(route => route.menuLabel && allowedPaths.includes(route.path))
                .filter(route => {
                  const path = route.path.toLowerCase();
                  if (path === "/login" && user) // Hide /login if user is logged in
                    return false;
                  return true;
                })

                .map(
                  ({ menuLabel, path }, i) =>
                    <Nav.Link
                      as={Link}
                      key={i}
                      to={path}
                      className={`${isActive(path) ? "navLinkActive" : ""} text-white ps-3 fs-5`}
                      onClick={() => setTimeout(() => setIsExpanded(false), 50)}>
                      {menuLabel}
                    </Nav.Link>
                )}

              {/* Display user dropdown if logged in */}
              {user ? (
                <>
                  {/* Desktop view */}
                  <div className="d-none d-md-block">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        variant="link"
                        className="nav-link text-white ps-3 fs-5">
                        {getTrimmedName(user.name)}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        align="start"
                        className="background-color-overlay-darker border-1 border-white">
                        {user.role === "admin" && (
                          <Dropdown.Item as={NavLink} to="/admin" className="text-white dropdown-menu-item d-flex align-items-center">
                            Admin
                          </Dropdown.Item>
                        )}

                        <Dropdown.Item onClick={() => openCart()} className="text-white dropdown-menu-item">
                          Kundvagn
                        </Dropdown.Item>

                        <Dropdown.Item onClick={logoutUser} className="text-white dropdown-menu-item">
                          Logga ut
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  {/* Mobile view */}
                  <div className="d-md-none">
                    <Nav.Link
                      className="text-white ps-3 fs-5"
                      onClick={() => {
                        openCart();
                        setIsExpanded(false);
                      }}>
                      Visa kundvagn
                    </Nav.Link>

                    {user.role === "admin" && (
                      <Nav.Link
                        as={Link}
                        to="/admin"
                        className="text-white ps-3 fs-5"
                        onClick={() => setTimeout(() => setIsExpanded(false), 50)}>
                        Admin
                      </Nav.Link>
                    )}

                    <Nav.Link
                      className="text-white ps-3 fs-5"
                      onClick={() => {
                        logoutUser();
                        setIsExpanded(false);
                      }}>
                      Logga ut
                    </Nav.Link>
                  </div>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
}
