import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';
import { Row, Col } from 'react-bootstrap';

export default function Header() {
  return <header>
    <Row>
      <Col>
        <div className='container'>
          <div className="d-flex align-items-center justify-content-between">

            <div className='p-3'>
              <Link to="/" className="text-decoration-none">
                <div className="d-flex">
                  <img src="./svg/logo.svg" alt="Logo" className='pe-3' />
                  <h2>Körbara</h2>
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
  </header >;
}
