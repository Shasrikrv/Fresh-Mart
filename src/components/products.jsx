import { useContext } from "react";
import Product from "./product";
import { ProductContext } from "../store/ProductsContext";

function Products() {
  const { items, addToCart, removeFromCart } = useContext(ProductContext);
  const groceryItems = items.map((product) => {
    return (
      <Product
        id={product.id}
        key={product.id}
        {...product}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    );
  });
  return <div className="products">{groceryItems}</div>;
}
export default Products;
