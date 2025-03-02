export default function Product(props) {
  const price = "$" + Math.round(props.price * 100) / 100;
  return (
    <div className="product">
      <img src={props.img} alt="product" height="200" width="100%" />
      <p className="product-description">
        <span>{props.name}</span>
        <span>{price}</span>
      </p>
      <button className="product-btn" onClick={() => props.addToCart(props.id)}>
        Add To Cart
      </button>
    </div>
  );
}
