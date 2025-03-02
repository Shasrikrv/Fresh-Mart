import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/main.jsx";
import ProductData from "./productData.jsx";
import Cart from "./cart.jsx";
import Products from "./components/products.jsx";
import { ProductProvider } from "./store/ProductsContext.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import YourOrders from "./YourOrder.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkoutpage",
          element: <CheckoutPage />,
        },
        {
          path: "order",
          element: <YourOrders />,
        },
      ],
    },
  ]);

  return (
    <ProductProvider products={ProductData}>
      <RouterProvider router={router} />
    </ProductProvider>
  );

  // return (
  // <ProductProvider products={ProductData}>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Main />}>
  //         <Route index element={<Products />} />
  //         <Route path="cart" element={<Cart />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // </ProductProvider>
  // );
}

export default App;
