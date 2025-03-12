import { useContext } from "react";
import { ProductContext } from "./store/ProductsContext";
import CheckoutPage from "./CheckoutPage";

export default function YourOrders() {
  const { orders, userDetails } = useContext(ProductContext);

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
            <h3>Customer Details</h3>
            <p>
              <strong>First Name:</strong> {userDetails.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userDetails.lastName}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Address:</strong> {userDetails.address}
            </p>
            <p>
              <strong>State:</strong> {userDetails.states}
            </p>
          </div>
        ))
      ) : (
        <p className="cart-empty">No orders yet.</p>
      )}
    </>
  );
}
