import { useContext } from "react";
import { ProductContext } from "./store/ProductsContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, addToCart, removeFromCart } = useContext(ProductContext);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <>
      <h2 className="cart-title">Your Cart</h2>
      {cart.length > 0 ? (
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
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.img} alt={item.name} className="cart-img" />
                </td>
                <td>{item.name}</td>
                <td>
                  <button
                    className="quantity-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => addToCart(item.id)}
                  >
                    +
                  </button>
                </td>
                <td>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="total-label">
                <strong>Total Price:</strong>
              </td>
              <td className="total-price">
                <strong>${totalPrice}</strong>
              </td>
              <td>
                <Link to="/checkoutpage">
                  <button className="checkout-btn">Proceed to Checkout</button>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </>
  );
}

export default Cart;
