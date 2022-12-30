import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warnError, setWarnError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const handleLogin = () => {
    if (email === '') {
      setWarnError('Email Cannot Be Blank');
    } else if (password === '') {
      setWarnError('Password Cannot Be Blank');
    } else {
      dispatch(login(email, password));
      setWarnError(null);
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <div className="login-form container-xxl p-md-4 p-2 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="login-form-container d-flex flex-column justify-content-center align-items-center gap-4 w-25">
        <h1>LOGIN</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            {error && (
              <label
                htmlFor="password"
                className="mb-0 text-white alert bg-danger w-100"
              >
                {error}
              </label>
            )}
            {warnError && (
              <label
                htmlFor="password"
                className="mb-0 text-white alert bg-danger w-100"
              >
                {warnError}
              </label>
            )}
            <input
              type="text"
              className="username form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="password form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={handleLogin}
              className="login-btn btn btn-dark w-100"
              id="login"
            >
              Log In
            </button>
            <p>
              Have no account?{' '}
              <Link to="/signup" className="new-user">
                Sign Up
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
