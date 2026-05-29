import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";



// ✅ Redux
import { Provider } from "react-redux";

import { store } from "./redux/store";



const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    {/* ✅ Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
);



reportWebVitals();