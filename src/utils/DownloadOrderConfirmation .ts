import jsPDF from "jspdf";
import type Order from "../interfaces/Order";
import type OrderItem from "../interfaces/OrderItem";
import type Gear from "../interfaces/Gear";

interface OrderConfirmationProps {
  order: Order,
  orderItems: OrderItem[],
  gear: Gear[],
  orderTotal: number;
}

export const downloadOrderConfirmation = ({ order, orderItems, gear, orderTotal}: OrderConfirmationProps): void => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.text("Orderbekräftelse:", 20, 30);

  // Details
  doc.setFontSize(12);
  doc.text(`Ordernummer: ${order.id}`, 20, 50);
  doc.text(`Start datum: ${new Date(order.created).toLocaleDateString('sv-SE')}`, 20, 60);

  doc.text('Utrustning:', 20, 80);
  let yPosition = 90;

  orderItems
    .filter(orderItem => orderItem.orderId === order.id)
    .forEach((orderItem, index) => {
      const gearItem = gear.find(x => x.id === orderItem.ProductId);
      const gearName = gearItem?.name || `Produkt ID: ${orderItem.ProductId}`;
      const dailyPrice = gearItem?.dailyPrice || 0;

      doc.text(`${index + 1}. ${gearName} - ${dailyPrice} kr/dag`, 30, yPosition);
      yPosition += 10;
    });

  doc.text(`Pris/dag: ${orderTotal} kr`, 20, yPosition + 10);
  doc.save(`ljudforradet-order-${order.id}.pdf`);
};
