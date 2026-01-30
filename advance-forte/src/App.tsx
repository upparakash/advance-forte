import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer, { BackToTopButton } from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Exams from './pages/Exams';
import Faculty from './pages/Faculty';
import Blogs from './pages/Blogs';
import Scholarship from './pages/Scholarship';
import Login from './pages/Login';
import BlogCMS from './pages/BlogCMS';
import Syllabus from './pages/Syllabus';
import SEOHead from './components/SEOHead';

// Add custom styles
import './styles/animations.css';

function App() {
  console.log('App component rendering');
  console.log('Rendering App component');
  
  return (
    <Router>
      <SEOHead />
      <div className="font-body text-gray-900 antialiased">
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
            <Route path="/syllabus" element={<Syllabus />} />
          </Routes>
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </Router>
  );
}

export default App;