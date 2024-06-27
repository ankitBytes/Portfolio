import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import MouseHover from "./components/shared/mouseHover";
import Home from "./pages/homePage";
import Contact from "./pages/contact";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import AdminLayout from "./admin/adminLayout";
import AdminLogin from './admin/adminLogin';
import AdminDashboard from "./admin/adminDashboard";
import { useEffect } from "react";

import { UserAuth } from "./context/authContext";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  
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
    <Navigate to={"/admin/login"} state={{ from: location }} />
  );
}
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
