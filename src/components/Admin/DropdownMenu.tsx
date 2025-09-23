import { ButtonGroup, Dropdown } from "react-bootstrap";

interface DropdownMenuProps<T> {
  item: T;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  hideEdit?: boolean;
}

export default function DropdownMenu<T>({ item, onEdit, onDelete, hideEdit = false }: DropdownMenuProps<T>) {
  return <>
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle
        variant="dark"
        className="hover-grow border-0 w-100 bg-transparent text-danger"
        size="sm">
        Ändra
      </Dropdown.Toggle>
      <Dropdown.Menu
        align="start"
        className="background-color-overlay-darker border-1 border-light">

        {!hideEdit && (
          <Dropdown.Item
            onClick={() => onEdit(item)}
            className="text-white dropdown-menu-item">
            Redigera
          </Dropdown.Item>
        )}

        <Dropdown.Item
          onClick={() => onDelete(item)}
          className="text-white dropdown-menu-item">
          Ta bort
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>
}
