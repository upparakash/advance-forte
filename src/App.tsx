import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer, { BackToTopButton } from './components/Footer';
import SEOHead from './components/SEOHead';

// Public pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import Exams from './pages/Exams';
import Faculty from './pages/Faculty';
import Blogs from './pages/Blogs';
import Scholarship from './pages/Scholarship';
import Login from './pages/Login';
import BlogCMS from './pages/BlogCMS';
import BlogManagement from './pages/BlogManagement';
// Dashboard pages
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

// Styles
import './styles/animations.css';

/* ---------------- PUBLIC LAYOUT ---------------- */
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/blog-cms" element={<BlogCMS />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
};

/* ---------------- APP ROOT ---------------- */
function App() {
  return (
    <Router>
      <SEOHead />
      <div className="font-body text-gray-900 antialiased">
        <Routes>
          
          {/* 🌍 Public Website (WITH Header & Footer) */}
          <Route path="/*" element={<PublicLayout />} />

          {/* 🔐 Dashboard (NO Header / Footer) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="blogs" element={<BlogManagement />} />

          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
