import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/Home";
import Dashboard from "./Dashboard";
import UserDashboard from "./User/UserDashboard";
import Footer from "./Layout/Footer";
import About from "./Pages/About";
import Service from "./Pages/Service";
import BlogPage from "./Pages/Blog";
import ContactPage from "./Pages/Contact";
import DocumentPage from "./Pages/Document";
import VideoPage from "./Pages/Video";
import News1 from "./Pages/News1";
import News18 from "./Pages/News18";
import News17 from "./Pages/News17";
import News16 from "./Pages/News16";
import News15 from "./Pages/News15";
import News14 from "./Pages/News14";
import News13 from "./Pages/News13";
import News12 from "./Pages/News12";
import News11 from "./Pages/News11";
import News10 from "./Pages/News10";
import News9 from "./Pages/News9";
import News8 from "./Pages/News8";
import News7 from "./Pages/News7";
import News6 from "./Pages/News6";
import News5 from "./Pages/News5";
import News4 from "./Pages/News4";
import News3 from "./Pages/News3";
import News2 from "./Pages/News2";
import Service1 from "./Pages/Service1";
import Service2 from "./Pages/Service2";
import Service3 from "./Pages/Service3";
import Service4 from "./Pages/Service4";
import Service5 from "./Pages/Service5";
import Service6 from "./Pages/Service6";
import Service7 from "./Pages/Service7";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/about" element={<About onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service" element={<Service onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/blog" element={<BlogPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/contact" element={<ContactPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/document" element={<DocumentPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/video" element={<VideoPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news1" element={<News1 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news2" element={<News2 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news3" element={<News3 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news4" element={<News4 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news5" element={<News5 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news6" element={<News6 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news7" element={<News7 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news8" element={<News8 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news9" element={<News9 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news10" element={<News10 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news11" element={<News11 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news12" element={<News12 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news13" element={<News13 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news14" element={<News14 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news15" element={<News15 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news16" element={<News16 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news17" element={<News17 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/news18" element={<News18 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service1" element={<Service1 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service2" element={<Service2 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service3" element={<Service3 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service4" element={<Service4 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service5" element={<Service5 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service6" element={<Service6 onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/service7" element={<Service7 onLogin={() => setIsAuthenticated(true)} />} />


          {/* Protected Routes */}
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={() => setIsAuthenticated(false)} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/userdashboard/*"
            element={
              isAuthenticated ? (
                <UserDashboard onLogout={() => setIsAuthenticated(false)} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
 
  );
}

export default App;