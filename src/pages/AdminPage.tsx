import { Container, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import Logo from "../components/logo";
import type Gear from "../interfaces/gear";



export default function AdminPage() {
  const gear = useLoaderData() as Gear[];



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

        <div className="pt-5">


          <Tabs
            defaultActiveKey="1"
            id="something">

            <Tab eventKey="1" title="Utrustning">
              <Table striped bordered hover variant="dark" responsive className="admin-tabs">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Namn</th>
                    <th>Märke</th>
                    <th>Modell</th>
                    <th>Dagspris</th>
                    <th>Skick</th>
                    <th>Tillgänglig</th>
                    <th>Beskrivning</th>
                    <th>Redigera</th>
                  </tr>
                </thead>
                <tbody>
                  {gear.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.model}</td>
                      <td>{item.dailyPrice} kr</td>
                      <td>{item.condition}</td>
                      <td className={item.available ? "text-success" : "text-danger"}>
                        {item.available ? 'Ja' : 'Nej'}
                      </td>
                      <td>{item.desc}</td>
                      <td>
                        <button
                          onClick={() => alert(`Ändra utrustning: ${item.name}`)}
                          className="btn hover-grow w-100 text-primary border-0">
                          Ändra
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
