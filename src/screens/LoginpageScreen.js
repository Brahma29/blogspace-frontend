import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/UserSlices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const LoginpageScreen = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.authUser);
  const { loading, success, error } = authUser;

  const validator = () => {
    let error = false;
    if (email === '') {
      toast.error('Email is mandatory.');
    } else if (password === '') {
      toast.error('Password is mandatory.');
    }
    return error;
  };

  useEffect(() => {
    if (success) {
      toast.success('Welcome to BlogSpace!');
      navigate('/');
    } else if (error) {
      toast.error(error);
    }
  }, [dispatch, authUser]);

  const submitHandler = () => {
    if (!validator()) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="min-h-screen container-xl">
      <div className="flex items-center justify-center pt-24 register-form">
        <div className="flex flex-col items-center gap-4 form-container w-96">
          <h1 className="self-start mb-2 text-3xl font-medium">
            WELCOME BACK!
          </h1>
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

          <div className="w-full form-group">
            <p className="text-sm">
              Do we know you?{' '}
              <Link to="/signup" className="underline text-btnGreen">
                Register
              </Link>
            </p>
          </div>
          <div className="w-full form-group ">
            <button
              onClick={submitHandler}
              className="w-full py-2 font-medium text-white rounded bg-btnGreen"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginpageScreen;
