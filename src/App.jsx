import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Aos from "aos";
import "aos/dist/aos.css";
import "./App.css";
import MouseHover from "./components/shared/mouseHover";
import Home from "./pages/homePage";
import Contact from "./pages/contact";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import AdminLayout from "./admin/adminLayout";
import AdminLogin from './admin/adminLogin';
import AdminDashboard from "./admin/adminDashboard";
import { UserAuth } from "./context/authContext";
import Loader from "./components/shared/loader";

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
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MouseHover />
      <BrowserRouter>
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
      </BrowserRouter>
    </>
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
  let { currentUser } = UserAuth();
  let location = useLocation();
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
