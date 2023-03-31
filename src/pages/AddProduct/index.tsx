import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

import "./style.scss";

interface formDataType {
  [key: string]: FormDataEntryValue;
}

export function AddProduct() {
  const [productType, setProductType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const responseBody: formDataType = {};
  const navigate = useNavigate();

  function handleProductChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setProductType(event.target.value);
  }

  function test(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.forEach(
      (value, property: string) => (responseBody[property] = value)
    );

    api
      .post("saveProduct", responseBody)
      .then((response) => {
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  }

  return (
    <>
      <Header title="Product Add" />
      <form id="product_form" method="POST" onSubmit={test}>
        <div className="input_container">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            maxLength={10}
            minLength={1}
            placeholder="SKU1234567"
            title="SKU"
            required
          />
        </div>

        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            maxLength={50}
            minLength={1}
            placeholder="Product Name"
            title="Name"
            required
          />
        </div>

        <div className="input_container">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="0,0"
            title="Price"
            pattern="[0-9]+([,\.][0-9]+)?"
            step="0.01"
            min={0.01}
            required
          />
        </div>

        <div className="input_container">
          <label htmlFor="productType">Type Switcher</label>
          <select
            name="productType"
            id="productType"
            title="Select a product"
            onChange={handleProductChange}
            defaultValue="Select a product"
            required
          >
            <option value="" hidden>
              Select a product
            </option>
            <option value="dvd" id="DVD">
              DVD
            </option>
            <option value="book" id="Book">
              Book
            </option>
            <option value="furniture" id="Furniture">
              Furniture
            </option>
          </select>
        </div>

        {productType === "dvd" ? (
          <div className="dvd_container input_container">
            <label htmlFor="size">Size (MB)</label>
            <input
              type="number"
              name="size"
              id="size"
              title="Size"
              placeholder="0"
              pattern="[0-9]"
              step="1"
              min={1}
              required
            />
            <span className="attribute-description">Please, provide size</span>
          </div>
        ) : productType === "book" ? (
          <div className="book_container input_container">
            <label htmlFor="weight">Weight (KG)</label>
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder="0"
              pattern="[0-9]+([,\.][0-9]+)?"
              step="0.01"
              title="Weight"
              min={0.01}
              required
            />
            <span className="attribute-description">
              Please, provide weight
            </span>
          </div>
        ) : productType === "furniture" ? (
          <div className="furniture_container">
            <span className="input_container">
              <label htmlFor="height">Heigh (CM)</label>
              <input
                type="number"
                name="height"
                id="height"
                placeholder="0"
                title="Heigh"
                step="1"
                min={1}
                required
              />
            </span>
            <span className="input_container">
              <label htmlFor="width">Width (CM)</label>
              <input
                type="number"
                name="width"
                id="width"
                placeholder="0"
                title="Width"
                step="1"
                min={1}
                required
              />
            </span>
            <span className="input_container">
              <label htmlFor="length">Length (CM)</label>
              <input
                type="number"
                name="length"
                id="length"
                placeholder="0"
                title="Length"
                step="1"
                min={1}
                required
              />
            </span>
            <span>Please, provide dimensions</span>
          </div>
        ) : (
          ""
        )}
        {errorMessage ? (
          <span className="error-message">{errorMessage}</span>
        ) : (
          ""
        )}
      </form>
      <Footer />
    </>
  );
}
