import './App.css';
import HomepageScreen from './screens/HomepageScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginpageScreen from './screens/LoginpageScreen';
import SignupScreen from './screens/SignupScreen';
import BlogpageScreen from './screens/BlogpageScreen';
import EditorpageScreen from './screens/EditorpageScreen';
import UserprofileScreen from './screens/UserprofileScreen';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import { useEffect } from 'react';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomepageScreen />} />
          <Route path="/login" element={<LoginpageScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/blog/view/:id" element={<BlogpageScreen />} />
          <Route path="/blog/edit/:id" element={<EditorpageScreen />} />
          <Route path="/blog/add" element={<EditorpageScreen />} />
          <Route path="/profile" element={<UserprofileScreen />} />
          <Route path="/update-profile" element={<ProfileUpdateScreen />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
