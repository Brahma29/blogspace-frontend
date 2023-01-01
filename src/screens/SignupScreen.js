import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/UserSlices/AuthSlice';

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.authUser);
  const { loading, success, error } = authUser;
  const dispatch = useDispatch();

  const validator = () => {
    let error = false;
    if (firstName === '') {
      toast.error('First Name is mandatory.');
      error = true;
    } else if (lastName === '') {
      toast.error('Last Name is mandatory.');
      error = true;
    } else if (email === '') {
      toast.error('Email is mandatory.');
    } else if (password === '') {
      toast.error('Password is mandatory.');
    } else if (confirmPassword === '') {
      toast.error('Please confirm your password.');
    }
    return error;
  };

  useEffect(() => {
    if (success) {
      toast.success('Registeration successful! Please login to continue');
      navigate('/login');
    } else if (error) {
      toast.error(error);
    }
  }, [dispatch, loading]);

  const submitHandler = () => {
    if (!validator() && password === confirmPassword) {
      dispatch(registerUser({ firstName, lastName, email, password }));
    }
  };

  return (
    <div className="min-h-screen container-xl">
      <div className="flex items-center justify-center pt-24 register-form">
        <div className="flex flex-col items-center gap-4 form-container w-96">
          <h1 className="self-start mb-2 text-3xl font-medium">
            INTRODUCE YOURSELF
          </h1>
          <div className="flex w-full gap-2 form-group">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-1/2 p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
            />
          </div>
          <div className="w-full form-group ">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
            />
          </div>
          <div className="w-full form-group ">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
            />
          </div>
          <div className="w-full form-group ">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
            />
          </div>
          <div className="w-full form-group">
            <p className="text-sm">
              I think we know you!{' '}
              <Link to="/login" className="underline text-btnGreen">
                Login
              </Link>
            </p>
          </div>
          <div className="w-full form-group ">
            <button
              onClick={submitHandler}
              className="w-full py-2 font-medium text-white rounded bg-btnGreen"
            >
              {loading ? 'Please wait...' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
