import { useState } from "react";
import { Product } from "../../pages/ListProducts";

import "./style.scss";

interface CardProps {
  product: Product;
  onInputChange: (action: string, idToRemove: string) => void;
}

export function Card({ product, onInputChange }: CardProps) {
  const [cardsCheckedId, setCardsCheckedId] = useState([""]);

  function handleInputChange(event: any): void {
    const action = event.target.checked ? "add" : "remove";
    onInputChange(action, event.target.value);
  }

  const { id, sku, name, price, weight, size, dimensions } = product;
  return (
    <div
      className="card-container"
      style={
        weight
          ? { background: "var(--orange)" }
          : size
          ? { background: "var(--blue)" }
          : { background: "var(--yellow)" }
      }
    >
      <input
        type="checkbox"
        className="delete-checkbox"
        value={id}
        onChange={handleInputChange}
      />
      <div className="card-content">
        <span className="card-title-sku">{sku}</span>
        <p>{name}</p>
        <p>
          {weight ? "Weight: " + weight + " KG" : ""}
          {size ? "Size: " + size + " MB" : ""}
          {dimensions ? "Dimensions: " + dimensions : ""}
        </p>
        <span className="card-price">{price} $</span>
      </div>
    </div>
  );
}
