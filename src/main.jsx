import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

let theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Nunito Sans, sans-serif",
      textTransform: "none",
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
