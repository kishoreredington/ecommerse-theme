import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import setupLocatorUI from "@locator/runtime";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

import theme from "./theme.ts";

setupLocatorUI();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/*" element={<App />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
