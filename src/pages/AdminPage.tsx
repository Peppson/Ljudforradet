import { Button, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import type Gear from "../interfaces/Gear";
import type Users from "../interfaces/Users";
import Logo from "../components/logo";
import TableGear from "../components/TableGear";
import SharedPagination from "../components/SharedPagination";
import TableUsers from "../components/TableUsers";
import config from "../config/Config";
import UserCreate from "../components/Admin/UserCreate";
import ProductCreate from "../components/Admin/ProductCreate";

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = config.AdminPagePaginationSize;
  const revalidator = useRevalidator();

  const { gear, users } = useLoaderData() as {
    gear: Gear[];
    users: Users[];
  };

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
      <div className="mx-5">
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
            <Link to="#">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary">Skapa ny {getCurrentTabName()}</button>
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
              <h1>Sad :(</h1> {/* todo */}
            </Tab>
          </Tabs>
        </div>

        <SharedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}>
        </SharedPagination>
      </div >

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header
          closeButton
          className="modal-background border-secondary"
          closeVariant="white">
          <Modal.Title>
            Skapa ny {getCurrentTabName()}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-background p-4">
          {activeTab === "1" && <ProductCreate revalidator={revalidator} onSuccess={() => setShowModal(false)} />}
          {activeTab === "2" && <UserCreate revalidator={revalidator} onSuccess={() => setShowModal(false)} />}
          {activeTab === "3" && <h1>Order</h1>}
        </Modal.Body>

        <Modal.Footer className="border-secondary modal-background">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Stäng
          </Button>
          <Button type="submit" form="registerForm" variant="primary">
            Skapa
          </Button>
        </Modal.Footer>
      </Modal>
    </section >
  </>;
}
