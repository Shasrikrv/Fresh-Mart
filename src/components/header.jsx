import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">FreshMart</Link>
      <Link to="/order"> Orders</Link>
      <Link to="/cart">
        <img src="/images/shopping-cart.png" alt="cart-icon" />
      </Link>
    </header>
  );
}
