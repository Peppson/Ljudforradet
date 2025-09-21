import { Table } from "react-bootstrap";
import type Users from "../../interfaces/Users";

export default function UserTable({ user }: { user: Users[] }) {
  return <>
    <Table striped bordered hover variant="dark" responsive className="admin-tabs">
      <thead>
        <tr>
          <th>Id</th>
          <th>Namn</th>
          <th>Email</th>
          <th>Roll</th>
          <th>Skapad</th>
          <th>Redigera</th>
        </tr>
      </thead>
      <tbody>
        {user.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td className={item.role === "admin" ? "text-danger" : ""}>
              {item.role === "user" ? "användare" : item.role}
            </td>
            <td>{item.created}</td>
            <td>
              <button
                onClick={() => alert(`Ändra users: ${item.name}`)}
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
