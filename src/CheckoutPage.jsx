import { useContext, useState, useRef } from "react";
import { ProductContext } from "./store/ProductsContext";
import { useNavigate } from "react-router-dom";
import useInput, { FieldType } from "./hooks/useInput";

export default function CheckoutPage() {
  const { cart, addToOrders, saveUserDetails } = useContext(ProductContext);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const {
    val: firstName,
    setVal: setFirstName,
    isValid: isFirstNameValid,
    isTouched: isFirstNameTouched,
    setIsTouched: setFirstNameTouched,
    errorMessage: firstNameErrorMessage,
  } = useInput("", FieldType.NAME, "firstName");

  const {
    val: lastName,
    setVal: setLastName,
    isValid: isLastNameValid,
    isTouched: isLastNameTouched,
    setIsTouched: setLastNameTouched,
    errorMessage: lastNameErrorMessage,
  } = useInput("", FieldType.NAME, "lastName");

  const {
    val: email,
    setVal: setEmail,
    isValid: isEmailValid,
    isTouched: isEmailTouched,
    setIsTouched: setEmailTouched,
    errorMessage: emailErrorMessage,
  } = useInput("", FieldType.EMAIL, "email");

  const {
    val: address,
    setVal: setAddress,
    isValid: isAddressValid,
    isTouched: isAddressTouched,
    setIsTouched: setAddressTouched,
    errorMessage: addressErrorMessage,
  } = useInput("", FieldType.ADDRESS, "address");

  const {
    val: state,
    setVal: setState,
    isValid: isStateValid,
    isTouched: isStateTouched,
    setIsTouched: setStateTouched,
    errorMessage: stateErrorMessage,
  } = useInput("", FieldType.STATE, "state");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleCheckout(e) {
    e.preventDefault();
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isAddressValid ||
      !isStateValid
    ) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    const formData = { firstName, lastName, email, address, state };
    console.log(state);
    saveUserDetails(formData);
    addToOrders();
    navigate("/order");
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleCheckout}>
        <h1>Shipping Address</h1>
        {!isValid ? (
          <p className="error">
            Please fill out all fields correctly before proceeding.
          </p>
        ) : null}
        <label>
          First Name:
          {((!isFirstNameValid && isFirstNameTouched) ||
            firstNameErrorMessage.firstName) && (
            <p className="error">{firstNameErrorMessage.firstName}</p>
          )}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={(e) => setFirstNameTouched(true)}
          />
        </label>
        <label>
          Last Name:
          {((!isLastNameValid && isLastNameTouched) ||
            lastNameErrorMessage.lastName) && (
            <p className="error">{lastNameErrorMessage.lastName}</p>
          )}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={(e) => setLastNameTouched(true)}
          />
        </label>
        <label>
          Email:
          {((!isEmailValid && isEmailTouched) || emailErrorMessage.email) && (
            <p className="error">{emailErrorMessage.email}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="XYZ@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => setEmailTouched(true)}
          />
        </label>
        <label>
          Street Address:
          {((!isAddressValid && isAddressTouched) ||
            addressErrorMessage.address) && (
            <p className="error">{addressErrorMessage.address}</p>
          )}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={(e) => setAddressTouched(true)}
          />
        </label>
        <label>
          Select your State:
          {((!isStateValid && isStateTouched) || stateErrorMessage.state) && (
            <p className="error">{stateErrorMessage.state}</p>
          )}
          <select
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            onFocus={() => setStateTouched(true)}
          >
            <option value="">Select your state</option>
            <option value="New York"> New York</option>
            <option value="New Jersey"> New Jersey</option>
            <option value="California">California</option>
            <option value="Chicago">Chicago</option>
            <option value="Texas">Texas</option>
          </select>
        </label>
        <button type="submit">Confirm Checkout</button>
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
