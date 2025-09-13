import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function Main() {
  return <main>
    <Outlet />
  </main >;
}
