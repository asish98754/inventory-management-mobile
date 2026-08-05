import { create } from "zustand";
import { Product } from "../types/product";

interface ProductStore {
  products: Product[];
  selectedProduct?: Product;

  setProducts: (products: Product[]) => void;

  setSelectedProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  selectedProduct: undefined,

  setProducts: (products) =>
    set({
      products,
    }),

  setSelectedProduct: (product) =>
    set({
      selectedProduct: product,
    }),
}));
