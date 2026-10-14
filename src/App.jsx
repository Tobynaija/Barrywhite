
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Destinations from "./components/Destinations";
import Packages from "./components/Packages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdmin from "./admin/ProtectedAdmin";

function PublicWebsite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Destinations />
        <Packages />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicWebsite />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminDashboard />
          </ProtectedAdmin>
        }
      />
    </Routes>
  );
}
