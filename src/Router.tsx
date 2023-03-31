import { Routes, Route } from "react-router-dom";
import { AddProduct } from "./pages/AddProduct";
import { ListProducts } from "./pages/ListProducts";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<ListProducts />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
}
