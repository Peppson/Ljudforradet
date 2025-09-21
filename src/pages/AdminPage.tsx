import { Button, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import type Gear from "../interfaces/Gear";
import type Users from "../interfaces/Users";
import Logo from "../components/logo";
import GearTable from "../components/Admin/GearTable";
import SharedPagination from "../components/Admin/SharedPagination";
import UserTable from "../components/Admin/UserTable";
import config from "../config/Config";
import UserCreate from "../components/Admin/UserCreate";
import ProductCreate from "../components/Admin/ProductCreate";
import DeleteModal from "../components/Admin/DeleteModal";

export default function AdminPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    type: "",
    item: null as Gear | Users | null // todo add orders
  });

  const revalidator = useRevalidator();

  const { gear, users } = useLoaderData() as {
    gear: Gear[];
    users: Users[];
    // todo add orders
  };








  const handleEditGear = (item: Gear) => {
    console.log("GEAR EDIT");
    // TODO: edit
  };

  const handleDeleteGear = (item: Gear) => {
    setDeleteModal({
      show: true,
      type: 'gear',
      item: item
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      show: false,
      type: "",
      item: null
    });
  };







  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("1");
  const itemsPerPage = config.AdminPagePaginationSize;

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
    <section className="background-color-overlay pb-5">
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
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary">Skapa ny {getCurrentTabName()}</button>
            </Link>
          </div>
        </Row>

        <div className="pt-3 table-set-height">
          <Tabs defaultActiveKey="1" onSelect={handleTabChange}>
            <Tab eventKey="1" title="Utrustning">
              <GearTable
                gear={paginatedData as Gear[]}
                onEditGear={handleEditGear}
                onDeleteGear={handleDeleteGear} />
            </Tab>

            <Tab eventKey="2" title="Användare">
              <UserTable user={paginatedData as Users[]} />
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




      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered size="lg">
        <Modal.Header
          closeButton
          className="modal-background border-secondary"
          closeVariant="white">
          <Modal.Title>
            <Logo /> Skapa ny {getCurrentTabName()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-background p-4">
          {activeTab === "1" && <ProductCreate revalidator={revalidator} onSuccess={() => setShowCreateModal(false)} />}
          {activeTab === "2" && <UserCreate revalidator={revalidator} onSuccess={() => setShowCreateModal(false)} />}
          {activeTab === "3" && <h1>Order</h1>}
        </Modal.Body>
        <Modal.Footer className="border-secondary modal-background">
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Avbryt
          </Button>
          <Button type="submit" form="registerForm" variant="primary">
            Skapa
          </Button>
        </Modal.Footer>
      </Modal>



      <DeleteModal
        show={deleteModal.show}
        onHide={closeDeleteModal}
        item={deleteModal.item}
        type={deleteModal.type}
        revalidator={revalidator} />



    </section >
  </>;
}
