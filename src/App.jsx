import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css'
import MouseHover from './components/shared/mouseHover';
import Home from './pages/homePage';
import Contact from './pages/contact';
import Navbar from './components/shared/navbar';
import Footer from './components/shared/footer';

function App() {

  return (
    <>
        <MouseHover />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
