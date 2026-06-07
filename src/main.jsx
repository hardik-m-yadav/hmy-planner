import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
 import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
<ThemeProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ThemeProvider>
    </AuthProvider>
  </Provider>
);

