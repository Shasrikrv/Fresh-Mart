import { createContext, useState } from "react";

const ProductContext = createContext({
  items: [],
  cart: [],
  orders: [],
  addToOrders: () => {},
});

const ProductProvider = ({ children, products }) => {
  const [items, setItems] = useState(products);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  function addToCart(id) {
    const isCartItemExist = cart.some((cartItem) => cartItem.id === id);
    if (!isCartItemExist) {
      const productDetails = items.find((item) => item.id === id);
      if (productDetails) {
        const newProduct = { ...productDetails, quantity: 1 };
        setCart((prevCart) => [...prevCart, newProduct]);
      }
    } else {
      updateItemsInCart(id);
    }
  }

  function updateItemsInCart(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function removeFromCart(id) {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  }

  function addToOrders(id) {
    const orderDate = new Date().toLocaleDateString();
    const newOrder = { id: Date.now(), date: orderDate, items: [...cart] };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCart([]);
  }

  return (
    <ProductContext.Provider
      value={{ items, cart, orders, addToCart, removeFromCart, addToOrders }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
