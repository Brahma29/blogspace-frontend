import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Loader from '../components/Loader';

const Signup = () => {
  const [warnError, setWarnError] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const submitHandler = () => {
    if (username === '') {
      setWarnError('Please Provide a valid Username');
    } else if (name === '') {
      setWarnError('Please provide a valid name');
    } else if (email === '') {
      setWarnError('Please provide a valid email');
    } else if (password === '') {
      setWarnError('Please provide a valid password');
    } else if (password !== confirmPassword) {
      setWarnError('Password does not match');
    } else {
      dispatch(registerUser(username, name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  return (
    <div className="signup-form container-xxl min-vh-100 d-flex justify-content-center align-items-center">
      <div className="signup-form-container d-flex justify-content-center align-items-center gap-3 flex-column w-25">
        <h1>SIGN UP</h1>
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
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="text"
              className="name form-control"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="email form-control"
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

            <input
              type="text"
              className="confirm-password form-control"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={submitHandler}
              className="signup-btn btn btn-dark w-100"
              id="signup"
            >
              Sign Up
            </button>

            <p>
              Already have an account?{' '}
              <Link to="/login" className="already-registered">
                Log In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
