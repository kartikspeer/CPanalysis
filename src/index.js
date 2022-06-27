import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

//React 18 shipped March 29th, 2022. ReactDOM.render has been deprecated in React 18 and currently issues a warning and runs in a compatible mode.
//react-dom: ReactDOM.render has been deprecated. Using it will warn and run your app in React 17 mode.
//stop using render now!!!

//ReactDOM.render(<App />,document.getElementById("root"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

