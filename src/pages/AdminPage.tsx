import { Row, Tab, Tabs } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Logo from "../components/logo";
import type Gear from "../interfaces/Gear";
import type Users from "../interfaces/Users";
import TableGear from "../components/TableGear";
import SharedPagination from "../components/SharedPagination";
import TableUsers from "../components/TableUsers";
import config from "../config/Config";

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("1");
  const itemsPerPage = config.AdminPagePaginationSize;

  const { gear, users } = useLoaderData() as {
    gear: Gear[];
    users: Users[];
  };

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "1": return gear;
      case "2": return users;
      case "3": return []; // todo
      default: return [];
    }
  };

  const getCurrentTabName = () => {
    switch (activeTab) {
      case "1": return "utrustning";
      case "2": return "användare";
      case "3": return "order";
      default: return "utrustning";
    }
  };

  const currentData = getCurrentData();
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  const handleTabChange = (tab: string | null) => {
    if (tab) {
      setActiveTab(tab);
      setCurrentPage(1); // Reset to first page when switching tabs
    }
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

        <Row className="my-4">
          <div className="d-flex justify-content-start">
            <Link to="/admin/create">
              <button className="btn btn-primary">Skapa ny {getCurrentTabName()}</button>
            </Link>
          </div>
        </Row>

        <div className="pt-3 table-set-height">
          <Tabs defaultActiveKey="1" onSelect={handleTabChange}>
            <Tab eventKey="1" title="Utrustning">
              <TableGear gear={paginatedData as Gear[]} />
            </Tab>

            <Tab eventKey="2" title="Användare">
              <TableUsers user={paginatedData as Users[]} />
            </Tab>

            <Tab eventKey="3" title="Ordrar">
              <h1>Sad :(</h1>
            </Tab>
          </Tabs>

        </div>
        <SharedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div >
    </section >
  </>;
}