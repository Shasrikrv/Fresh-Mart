import { useContext } from "react";
import { ProductContext } from "./store/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, addToOrders } = useContext(ProductContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function signUp(formData) {
    Object.fromEntries(formData);
  }

  function handleCheckout() {
    addToOrders();
    navigate("/order");
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form" action={signUp}>
        <h1>Shipping Address</h1>
        <label>
          First Name
          <input type="text" name="firstname" placeholder="Jhon" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastname" placeholder="Abraham" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="jhon@gmail.com" />
        </label>
        <label>
          Street Address
          <input type="text" name="address" placeholder="h.no -4-7" />
        </label>
        <label>
          Select your State
          <select name="states">
            <option value="New York"> New York</option>
            <option value="New Jersey"> New Jersey</option>
            <option value="California">California</option>
            <option value="Chicago">Chicago</option>
            <option value="Texas">Texas</option>
          </select>
        </label>
        <button onClick={handleCheckout}>Confirm Checkout</button>
      </form>

      <div className="order-summary">
        <h2 className="cart-title">Order summary</h2>
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
                    <span className="quantity">{item.quantity}</span>
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
              </tr>
            </tfoot>
          </table>
        ) : null}
      </div>
    </div>
  );
}
