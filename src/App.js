import { useEffect } from 'react';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewBlogScreen from './screens/NewBlogScreen';
import PostViewScreen from './screens/PostViewScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersScreen from './screens/UsersScreen';
import MyPostsScreen from './screens/MyPostsScreen';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/new-blog/:id" element={<NewBlogScreen />} />
            <Route path="/new-blog" element={<NewBlogScreen />} />
            <Route path="/view-blog/:id" element={<PostViewScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/user-manage" element={<UsersScreen />} />
            <Route path="/profile/myposts" element={<MyPostsScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
