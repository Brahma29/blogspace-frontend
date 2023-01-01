/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, getProfile } from '../services/user';
import { saveUserInfo } from '../redux/UserSlices/userSlice';

const LoginpageScreen = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo);

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
    if (userInfo && userInfo.data) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  const submitHandler = async () => {
    if (!validator()) {
      try {
        const { data } = await login({ email, password });
        localStorage.setItem('access_token', data.doc.token);
        const { data: userInfo } = await getProfile();
        localStorage.setItem('userInfo', JSON.stringify(userInfo.doc));
        dispatch(saveUserInfo(userInfo.doc));
        toast.success('Welcome to BlogSpace!');
        navigate('/');
      } catch (error) {
        toast.error(error.message);
      }
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
