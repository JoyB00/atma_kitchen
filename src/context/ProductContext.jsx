import { createContext, useReducer } from "react";

import { FetchAllProducts } from "../api/ProductApi";

const ProductContext = createContext({
  items: [],
  getProduct: () => {},
});

function productReducer(state, action) {
  if (action.type === "FETCH_PRODUCT") {
    FetchAllProducts()
      .then((res) => {
        return { ...state, items: res };
      })
      .catch((err) => {
        console.log(err);
        return { ...state, items: [] };
      });
  }
  return state;
}

export function ProductContextProvider({ children }) {
  const [product, dispatchProductAction] = useReducer(productReducer, {
    items: [],
  });

  function getProduct() {
    console.log("disini kah");
    dispatchProductAction({ type: "FETCH_PRODUCT" });
  }

  const productContext = {
    items: product.items,
    getProduct: getProduct,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}
export default ProductContext;
