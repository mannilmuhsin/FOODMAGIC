import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import {  } from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./context/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./index.css";

let persistor = persistStore(Store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
