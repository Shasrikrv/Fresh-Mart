import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Main() {
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
}
