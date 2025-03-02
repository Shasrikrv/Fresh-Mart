import { useContext } from "react";
import { ProductContext } from "./store/ProductsContext";

export default function YourOrders() {
  const { orders } = useContext(ProductContext);

  return (
    <>
      <h2 className="cart-title">Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id}>
            <h3>Order Date: {order.date}</h3>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="cart-img"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No orders yet.</p>
      )}
    </>
  );
}
