import { Table, Pagination } from "react-bootstrap";
import { useState } from "react";
import type Gear from "../interfaces/Gear";

export default function TableGear({ gear }: { gear: Gear[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // pagination
  const totalPages = Math.ceil(gear.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGear = gear.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return <>
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
        {currentGear.map((item) => (
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

    {totalPages > 1 && (
      <div className="d-flex justify-content-center mt-3">
        <Pagination className="pagination-dark">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div >
    )
    }
  </>
}