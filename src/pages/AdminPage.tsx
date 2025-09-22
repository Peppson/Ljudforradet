import { Row, Tab, Tabs } from "react-bootstrap";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { getCurrentTabName } from "../utils/Utilities";
import type Gear from "../interfaces/Gear";
import type User from "../interfaces/User";
import type Order from "../interfaces/Order";
import type OrderItem from "../interfaces/OrderItem";
import Logo from "../components/logo";
import GearTable from "../components/Admin/Gear/GearTable";
import SharedPagination from "../components/Admin/SharedPagination";
import UserTable from "../components/Admin/User/UserTable";
import config from "../config/Config";
import ModalDelete from "../components/Admin/Modals/ModalDelete";
import ModalCreate from "../components/Admin/Modals/ModalCreate";
import ModalEdit from "../components/Admin/Modals/ModalEdit";
import OrderTable from "../components/Admin/Order/OrderTable";

export default function AdminPage() {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    type: "",
    item: null as Gear | User | Order | null
  });
  const [editModal, setEditModal] = useState({
    show: false,
    type: "",
    item: null as Gear | User | Order | null
  });

  const revalidator = useRevalidator();

  const { gear, users, orders, orderItems } = useLoaderData() as {
    gear: Gear[];
    users: User[];
    orders: Order[];
    orderItems: OrderItem[];
  };

  // Modal views
  const handleEditGear = (item: Gear) => { setEditModal({ show: true, type: "gear", item: item }); };
  const handleDeleteGear = (item: Gear) => { setDeleteModal({ show: true, type: "gear", item: item }); };
  const handleEditUser = (item: User) => { setEditModal({ show: true, type: "user", item: item }); };
  const handleDeleteUser = (item: User) => { setDeleteModal({ show: true, type: "user", item: item }); };
  const handleEditOrder = (item: Order) => { setEditModal({ show: true, type: "order", item: item }); };
  const handleDeleteOrder = (item: Order) => { setDeleteModal({ show: true, type: "order", item: item }); };

  const closeDeleteModal = () => {
    setDeleteModal({
      show: false,
      type: "",
      item: null
    });
  };

  const closeEditModal = () => {
    setEditModal({
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
      case "3": return orders;
      default: return [];
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

        <Row className="my-3">
          <div className="d-flex justify-content-start">
            <Link to="#">
              <button
                onClick={() => setCreateModal(true)}
                className="btn btn-primary">Skapa ny {getCurrentTabName(activeTab)}</button>
            </Link>
          </div>
        </Row>

        <div className="pt-3 table-set-height">
          <Tabs defaultActiveKey="1" onSelect={handleTabChange}>
            <Tab eventKey="1" title={`Utrustning (${gear.length})`}>
              <GearTable
                gear={paginatedData as Gear[]}
                onEditGear={handleEditGear}
                onDeleteGear={handleDeleteGear} />
            </Tab>

            <Tab eventKey="2" title={`Användare (${users.length})`}>
              <UserTable
                user={paginatedData as User[]}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser} />
            </Tab>

            <Tab eventKey="3" title={`Ordrar (${orders.length})`}>
              <OrderTable
                order={paginatedData as Order[]}
                orderItem={orderItems}
                users={users}
                gear={gear}
                onEditOrder={handleEditOrder}
                onDeleteOrder={handleDeleteOrder} />
            </Tab>
          </Tabs>
        </div>

        <SharedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}>
        </SharedPagination>
      </div >

      <ModalCreate
        show={createModal}
        onHide={() => setCreateModal(false)}
        activeTab={activeTab}
        revalidator={revalidator}
        users={users}
        gear={gear} />

      <ModalEdit
        show={editModal.show}
        onHide={closeEditModal}
        activeTab={activeTab}
        item={editModal.item}
        revalidator={revalidator}
        users={users}
        gear={gear} />

      <ModalDelete
        show={deleteModal.show}
        onHide={closeDeleteModal}
        item={deleteModal.item}
        type={deleteModal.type}
        revalidator={revalidator}
        orderItems={orderItems} />
    </section >
  </>;
}
