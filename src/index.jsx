import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
