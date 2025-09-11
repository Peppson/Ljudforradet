import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';
import { Row, Col } from 'react-bootstrap';

export default function Header() {
  return <header>
    <Row className="text-center py-3 ">
      <Col>

        <Link to="/">
          <h1>Kör bara</h1>
        </Link>

        <nav>
          {routes.filter(x => x.menuLabel).map(({ menuLabel, path }, i) =>
            <NavLink key={i} to={path}>{menuLabel}</NavLink>)}
        </nav>

      </Col>
    </Row>
  </header>;
}
