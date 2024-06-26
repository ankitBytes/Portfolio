import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import { color } from "@mui/system";

const AdminLogin = () => {
  const { currentUser, logIn } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState({ loading: false, error: null });
  const [loginStatus, setLoginStatus] = useState(
    location?.state?.from === "/admin/dashboard" ? false : true
  );

  useEffect(() => {
    setLoginStatus(location?.state?.isAdmin);
  }, [location]);

  useEffect(() => {
    if (currentUser) {
      navigate("/admin/dashboard", {
        state: { isAdmin: true },
      });
    }
    document.title = "Admin Login | Youth4Water Plus";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ loading: true, error: null });
    try {
      await logIn(email, password);
      setFormState({ loading: false, error: null });
      navigate("/admin/dashboard", {
        state: { isAdmin: true },
      });
    } catch (err) {
      let errmsg = err.code.replace("auth/", "").replaceAll("-", " ");
      console.log(errmsg);
      setFormState({ loading: false, error: errmsg });
    }
  };

  const styles = {
    formBox: {
      margin: "0 auto",
      maxWidth: "500px",
      padding: "1rem",
    },
    container: {
      py: "5rem",
      color: "white",
    },
  };
  return (
    <>
      <Box sx={{ background: 'white'}}>
        <Container maxWidth="xl" sx={styles.container}>
          {/* <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{
                fontFamily: "bebas neue",
                fontSize: "2rem",
                color: "#ef7f1a",
              }}
            >
              Login as Admin
            </Typography> */}

          <Box sx={styles.formBox}>
            {/* error message for login */}
            {formState.error !== null && (
              <Alert
                variant="outlined"
                severity="error"
                onClose={() => setFormState({ error: null })}
              >
                {formState.error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                disabled={formState.loading}
                variant="outlined"
                color="primary"
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                disabled={formState.loading}
              />
              <Button
                type="submit"
                variant="contained"
                // fullWidth
                disabled={formState.loading}
              >
                <Typography
                  variant="body1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {formState.loading ? "logging you in" : "Login"}
                </Typography>
              </Button>
            </form>
          </Box>
          <Box
            sx={{
              maxWidth: { xs: "100%", sm: "320px" },
              padding: "2rem 1rem",
              position: "absolute",
              bottom: "0",
              left: "0",
            }}
          >
            <Snackbar
              open={!loginStatus}
              autoHideDuration={1500}
              // onClose={() => setLoginStatus(false)}
              message={"You were logged out!"}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AdminLogin;
