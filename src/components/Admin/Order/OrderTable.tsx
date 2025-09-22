import { Table } from "react-bootstrap";
import type Order from "../../../interfaces/Order";
import type OrderItem from "../../../interfaces/OrderItem";
import type User from "../../../interfaces/User";
import type Gear from "../../../interfaces/Gear";
import DropdownMenu from "../DropdownMenu";
import React from "react";

interface OrderTableProps {
  order: Order[];
  orderItem: OrderItem[];
  users: User[];
  gear: Gear[];
  onEditOrder: (item: Order) => void;
  onDeleteOrder: (item: Order) => void;
}

export default function OrderTable({ order, orderItem, users, gear, onEditOrder, onDeleteOrder }: OrderTableProps) {
  const getUserName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : "Okänd";
  };

  const getNumOfGear = (orderId: number): string => {
    const itemsInOrder = orderItem.filter(item => item.orderId === orderId);
    return itemsInOrder.length.toString();
  };

  const getGearDetails = (productId: number): Gear | null => {
    return gear.find(g => g.id === productId) || null;
  };

  const getOrderItems = (orderId: number): OrderItem[] => {
    return orderItem.filter(item => item.orderId === orderId);
  };

  return <>
    <Table striped bordered hover variant="dark" responsive className="admin-tabs">
      <thead>
        <tr>
          <th>Användare</th>
          <th>Antal artiklar</th>
          <th>Skapad</th>
          <th>Redigera</th>
        </tr>
      </thead>

      <tbody>
        {order.map((item) => (
          <React.Fragment key={item.id}>

            {/* Main order row */}
            <tr>
              <td><strong>{getUserName(item.userId)}</strong></td>
              <td><strong>{getNumOfGear(item.id)}</strong></td>
              <td><strong>{item.created}</strong></td>
              <td className="text-center">
                <DropdownMenu
                  item={item}
                  onEdit={onEditOrder}
                  onDelete={onDeleteOrder} />
              </td>
            </tr>

            {/* Gear table for this order */}
            <tr key={`${item.id}-gear`}>
              <td colSpan={5} className="p-0 pb-3">
                <div className="ps-4 pe-2 py-2">
                  <Table variant="dark" size="sm" className="mb-0">
                    <thead>
                      <tr className="bg-secondary">
                        <th>Id</th>
                        <th>Namn</th>
                        <th>Märke</th>
                        <th>Modell</th>
                        <th>Dagspris</th>
                        <th>Skick</th>
                        <th>Beskrivning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getOrderItems(item.id)
                        .sort((a, b) => a.ProductId - b.ProductId)
                        .map((orderItem, index) => {
                          const product = getGearDetails(orderItem.ProductId);
                          return (
                            <tr key={`${item.id}-${orderItem.ProductId}-${index}`}>
                              <td>{product?.id || ""}</td>
                              <td>{product?.name || ""}</td>
                              <td>{product?.brand || ""}</td>
                              <td>{product?.model || ""}</td>
                              <td>{product?.dailyPrice + " kr" || ""}</td>
                              <td>{product?.condition || ""}</td>
                              <td>{product?.desc || '-'}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  </>
}
