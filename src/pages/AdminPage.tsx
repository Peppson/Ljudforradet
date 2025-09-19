import { Row, Tab, Table, Tabs } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import Logo from "../components/logo";
import type Gear from "../interfaces/Gear";
import type Users from "../interfaces/Users";
import TableGear from "../components/TableGear";

export default function AdminPage() {
  const { gear, users } = useLoaderData() as {
    gear: Gear[];
    users: Users[];
  };

  return <>
    <section className="background-color-overlay">
      <div className="vh-100 mx-5">
        <Row>
          <div className="py-4">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex">
                <div className="pe-2">
                  <Logo />
                </div>
                <h2>Admin</h2>
              </div>
            </Link>
          </div>
        </Row>

        <div className="pt-3">
          <Tabs defaultActiveKey="1">
            <Tab eventKey="1" title="Utrustning">
              <TableGear gear={gear} />
            </Tab>

            <Tab eventKey="2" title="Kunder">
              <h1>2</h1>
            </Tab>


            <Tab eventKey="3" title="Ordrar">
              <h1>3</h1>
            </Tab>


          </Tabs >








        </div >
      </div >
    </section >
  </>;
}
