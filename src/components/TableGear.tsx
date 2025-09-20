import { Table } from "react-bootstrap";
import type Gear from "../interfaces/Gear";

export default function TableGear({ gear }: { gear: Gear[] }) {
  return <>
    <Table striped bordered hover variant="dark" responsive className="admin-tabs">
      <thead>
        <tr>
          <th>Id</th>
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
  </>
}
