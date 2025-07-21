import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
// import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        {/* <SocketProvider value={{}}> */}
          <App />
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                theme: {
                  primary: "#4aed88",
                  secondary: "#FFFAEE",
                },
              },
            }}
          />
        {/* </SocketProvider> */}
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
