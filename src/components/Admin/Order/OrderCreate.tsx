import { Form } from "react-bootstrap";
import { useApi } from "../../../hooks/useApi";
import { useEffect, useRef, useState } from "react";
import { useShowAlert } from "../../../context/AlertProvider";
import type Order from "../../../interfaces/Order";
import type User from "../../../interfaces/User";
import type Gear from "../../../interfaces/Gear";

interface OrderCreateProps {
  revalidator: { revalidate: () => void };
  onSuccess?: () => void;
  users: User[];
  gear: Gear[];
  editItem?: Order; // = edit mode
}

export default function OrderCreate({ revalidator, onSuccess, users, gear, editItem }: OrderCreateProps) {
  const { showAlert } = useShowAlert();
  const { postFetch, putFetch } = useApi();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isEditMode = !!editItem;


  let [OrderData, setOrderData] = useState({
    userId: "",
    gearId: [] as string[],
  });

  // Prefill if edit mode
  /* useEffect(() => {
    if (isEditMode) {
      setOrderData({
        name: editItem.name || "",
        email: editItem.email || "",
        password: "" // never prefill password
      });
    }
  }, [editItem]); */

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLSelectElement;
    const trimmedValue = value?.trim() || "";
    setOrderData({ ...OrderData, [name]: trimmedValue });
  }

  async function validateResponse(success: Response | null) {
    if (!success || !success.ok) {
      await showAlert({ title: "Error", message: "Något gick fel. Försök igen.", variant: "danger" })
      return { isValid: false, data: null };
    }

    const responseData = await success.json();
    return { isValid: true, data: responseData };
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();

    // Order
    const response = await postFetch("/api/orders", { userId: OrderData.userId });
    const validation = await validateResponse(response);
    if (!validation.isValid)
      return;

    const orderData = validation.data;
    const orderId = orderData.insertId;

    // OrderItems
    try {
      const orderItemPromises = OrderData.gearId.map(gearId =>
        postFetch("/api/orderItems", {
          orderId: orderId,
          productId: gearId
        })
      );
      await Promise.all(orderItemPromises);

      // Update gear availability for selected items
      const gearUpdatePromises = OrderData.gearId.map(gearId =>
        putFetch(`/api/products/${gearId}`, {
          available: 0
        })
      );
      await Promise.all(gearUpdatePromises);

    } catch (error) {
      await showAlert({ title: "Error", message: "Något gick fel. Försök igen.", variant: "danger" })
      return;
    }

    revalidator.revalidate();

    if (onSuccess) {
      onSuccess();
    }
  }

  // Custom dropdown menu control
  const getItemDesc = (item: Gear, isAvailable: boolean) => {
    return `${item.name} - ${item.brand} ${item.model} (${item.dailyPrice} kr/dag)${!isAvailable ? " (Ej tillgänglig)" : ""}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGearSelect = (gearId: string, isAvailable: boolean) => {
    if (!isAvailable) return;

    const currentGearIds = OrderData.gearId;

    if (!currentGearIds.includes(gearId)) {
      setOrderData({ ...OrderData, gearId: [...currentGearIds, gearId] });
      gear.find(item => item.id.toString() === gearId)!.available = false;
    }
  };

  return <>
    <Form id="registerForm" onSubmit={sendForm}>
      <Form.Group className="mb-3">
        <Form.Label className="d-block">
          <p className="mb-1 text-light">Vilken användare?</p>
          <Form.Select
            name="userId"
            onChange={setFormProp}
            required
            className="modal-select-options"
            value={OrderData.userId}>
            <option value="">Välj en användare</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
        </Form.Label>
      </Form.Group>

      {/* Custom dropdown meny with scrollbar, the whole thing is just wild */}
      <Form.Group className="mb-3">
        <Form.Label className="d-block">
          <p className="mb-1 text-light">Välj utrustning</p>
          <div className="position-relative" ref={dropdownRef}>

            <button
              type="button"
              className="form-select modal-select-options text-start"
              style={{ cursor: "default" }}
              onClick={() => { setIsDropdownOpen(!isDropdownOpen); }}>

              {OrderData.gearId.length > 0
                ? OrderData.gearId.map(id =>
                  gear.find(item => item.id.toString() === id)?.name
                ).join(", ")
                : "Välj utrustning"}
            </button>

            {isDropdownOpen && (
              <div className="position-absolute w-100 bg-white rounded admin-custom-dropdown">
                {gear.map((item) => {
                  const isAvailable = item.available == true;
                  return (
                    <div
                      key={item.id}
                      className={`px-3 py-1 ${isAvailable ? "text-black" : "text-muted opacity-50"}`}
                      onMouseEnter={(e) => {
                        if (isAvailable) {
                          e.currentTarget.style.backgroundColor = "#1967D2";
                          e.currentTarget.style.setProperty("color", "white", "important");
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.setProperty("color", "black", "important");
                      }}
                      onClick={() => {
                        handleGearSelect(item.id.toString(), isAvailable);
                      }}>
                      {getItemDesc(item, isAvailable)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Form.Label>
      </Form.Group>
    </Form >
  </>
}
