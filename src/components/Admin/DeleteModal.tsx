import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useApi } from '../../hooks/useApi';
import Logo from "../logo";
import type Gear from "../../interfaces/Gear";
import type Users from "../../interfaces/Users";

interface DeleteModalProps {
  show: boolean;
  onHide: () => void;
  item: Gear | Users | null; // todo orders
  type: string;
  revalidator: { revalidate: () => void };
}

export default function DeleteModal({ show, onHide, item, type, revalidator }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteFetch } = useApi();

  const getItemName = () => {
    if (!item) return '';
    return (item as any).name || '';
  };

  const getItemTypeName = () => {
    switch (type) {
      case 'gear': return 'utrustning';
      case 'user': return 'användare';
      case 'order': return 'order';
      default: return 'objekt';
    }
  };

  const handleDelete = async () => {
    if (!item) return;
    setIsDeleting(true);
    const typeName = type == "gear" ? "products" : `${type}s`; //...

    try {
      await deleteFetch(`/api/${typeName}/${item.id}`);
      revalidator.revalidate();
      onHide();
    } catch (error) {
      alert('Något gick fel vid borttagning. Försök igen.');
    } finally {
      setIsDeleting(false);
    }
  };

  return <>
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="custom-modal-border">
      <Modal.Header
        closeButton
        className="modal-background border-secondary"
        closeVariant="white">
        <Modal.Title>
          <Logo /> Ta bort {getItemTypeName()}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-background p-4">
        <p className="text-white">
          Är du säker på att du vill ta bort "{getItemName()}"?
        </p>
        <p className="text-light small">
          Åtgärden kan inte ångras.
        </p>
      </Modal.Body>

      <Modal.Footer className="border-secondary modal-background">
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={isDeleting}>
          Avbryt
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={isDeleting}>
          Ta bort
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}