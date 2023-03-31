import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Card } from "../../components/Card";

import "./style.css";

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  weight?: number;
  dimensions?: string;
  size?: number;
}

export function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsIdToDelete, setProductsIdToDelete] = useState<string[]>([]);

  async function deleteProducts() {
    if (productsIdToDelete.length > 0) {
      await api
        .post("deleteProducts", {
          ids: productsIdToDelete,
        })
        .then((response) => {
          const productsRemaining = products.filter((product) => {
            return !productsIdToDelete.includes(product.id);
          });
          setProducts(productsRemaining);
          setProductsIdToDelete([]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function modifyProductsIdToDelete(action: string, idToRemove: string): void {
    if (action === "add") {
      setProductsIdToDelete([...productsIdToDelete, idToRemove]);
    } else {
      const productsIdWithoutDeletedOne = productsIdToDelete.filter((id) => {
        return id !== idToRemove;
      });
      setProductsIdToDelete(productsIdWithoutDeletedOne);
    }
  }

  const getProducts = async () => {
    await api
      .get("getProducts", {
        headers: { "Access-Control-Allow-Origin": "*" },
        responseType: "json",
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header title="Product List" deleteProducts={deleteProducts} />
      <main>
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              product={product}
              onInputChange={modifyProductsIdToDelete}
            />
          );
        })}

        {products.length === 0 ? (
          <span className="no-products">Product list is empty</span>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}
