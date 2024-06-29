import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "./context/authContext.jsx";

let theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Nunito Sans, sans-serif",
      textTransform: "none",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "white", // Border color
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "white", // Border color on hover
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white", // Border color when focused
          },
          "& .MuiInputBase-input": {
            color: "white", // Text color
          },
          "& .MuiFormHelperText-root": {
            color: "white", // Helper text color
          },
          "& .MuiInputLabel-root": {
            color: "white", // Label color
          },
          // Ensuring multiline text area is also styled
          "& .MuiInputBase-inputMultiline": {
            color: "white", // Text color for multiline input
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
