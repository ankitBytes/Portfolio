import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Aos from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { Box } from "@mui/material";
import Loader from "./components/shared/loader";
import MouseHover from "./components/shared/mouseHover";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import { UserAuth } from "./context/authContext";

const Home = lazy(() => import("./pages/homePage"));
const Contact = lazy(() => import("./pages/contact"));
const AdminLayout = lazy(() => import("./admin/adminLayout"));
const AdminLogin = lazy(() => import("./admin/adminLogin"));
const AdminDashboard = lazy(() => import("./admin/adminDashboard"));

const t0 = performance.now();

function renderCallback() {
  const t1 = performance.now();
  console.log(`Mount took ~${(t1 - t0) / 1000} seconds.`);
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init();
    renderCallback();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Reduce loading time if possible

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <MouseHover />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login" element={<AdminLogin />} />
              <Route
                path="dashboard"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Box>
  );
}

const RootLayout = () => {
  return (
    <div className="body">
      <Navbar />
      <MouseHover />
      <Outlet />
      <Footer />
    </div>
  );
};

function RequireAuth({ children }) {
  const { currentUser } = UserAuth();
  const location = useLocation();

  return currentUser ? (
    children
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
