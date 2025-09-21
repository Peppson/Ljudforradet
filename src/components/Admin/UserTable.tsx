import { Table } from "react-bootstrap";
import type User from "../../interfaces/Users";
import DropdownMenu from "./DropdownMenu";

interface UserTableProps {
  user: User[];
  onEditUser: (item: User) => void;
  onDeleteUser: (item: User) => void;
}

export default function GearTable({ user, onEditUser, onDeleteUser }: UserTableProps) {
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
            <td className="text-center">
              <DropdownMenu
                item={item}
                onEdit={onEditUser}
                onDelete={onDeleteUser} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
}
