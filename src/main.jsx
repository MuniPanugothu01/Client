  import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import appcontext porvider
import { AppContextProvider } from "./context/AppContect.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
