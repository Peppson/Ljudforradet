import { createContext, useContext, useState, type ReactNode } from "react";
import { Modal } from "react-bootstrap";

interface ModalData {
  title: string;
  message: string;
  variant?: "success" | "danger" | "warning" | "info";
}

interface AlertProviderContextType {
  showAlert: (data: ModalData) => Promise<void>;
}

const GlobalModalContext = createContext<AlertProviderContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalData | null>(null);
  const [show, setShow] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(() => void) | null>(null);

  const showAlert = (data: ModalData): Promise<void> => {
    return new Promise((resolve) => {
      setModal(data);
      setShow(true);
      setResolvePromise(() => resolve);
    });
  };

  const hideModal = () => {
    setShow(false);
    setTimeout(() => {
      setModal(null);
      if (resolvePromise) {
        resolvePromise();
        setResolvePromise(null);
      }
    }, 150); // Let animation finish
  };

  const getVariantClass = () => {
    switch (modal?.variant) {
      case "success": return "bg-success";
      case "danger": return "bg-danger";
      case "warning": return "bg-warning";
      case "info": return "bg-info";
      default: return "bg-white";
    }
  };

  return (
    <GlobalModalContext.Provider value={{ showAlert }}>
      {children}

      {modal && (
        <Modal
          show={show}
          onHide={hideModal}
          centered
          dialogClassName="custom-modal-border">

          <Modal.Header
            closeButton
            closeVariant="white"
            className={`border-0 ${getVariantClass()}`}>
            <Modal.Title>
              {modal.title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-background p-4">
            <p>{modal.message}</p>
          </Modal.Body>

          <Modal.Footer className="border-0 modal-background" />
        </Modal>
      )}
    </GlobalModalContext.Provider>
  );
}

export function useShowAlert() {
  const context = useContext(GlobalModalContext);
  if (!context) {
    throw new Error("useShowAlert must be used within an AlertProvider");
  }
  return context;
}
