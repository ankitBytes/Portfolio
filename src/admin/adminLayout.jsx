import { Outlet } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";
import MouseHover from "../components/shared/mouseHover";

const AdminLayout = () => {
  const { currentUser } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/admin/login");
    } else {
      navigate("/admin/dashboard");
    }
  }, []);
  return (
    <>
      <Navbar />
      <MouseHover />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;
