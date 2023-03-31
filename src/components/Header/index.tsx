import "./style.css";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  title: string;
  deleteProducts?: () => void;
}

export function Header({ title, deleteProducts }: HeaderProps) {
  function handleDeleteProducts() {
    if (deleteProducts) {
      deleteProducts();
    }
  }

  return (
    <header>
      <h1>{title}</h1>
      {title === "Product List" ? (
        <nav className="buttons-container">
          <NavLink to="/add-product" title="Add Product">
            <button className="dark-button">ADD</button>
          </NavLink>
          <button
            id="#delete-product-btn"
            title="Delete Products"
            onClick={handleDeleteProducts}
          >
            MASS DELETE
          </button>
        </nav>
      ) : (
        <nav className="buttons-container">
          <button
            id="save-products"
            className="dark-button"
            title="Save"
            type="submit"
            form="product_form"
          >
            Save
          </button>
          <NavLink to="/" title="Cancel">
            <button>Cancel</button>
          </NavLink>
        </nav>
      )}
    </header>
  );
}
