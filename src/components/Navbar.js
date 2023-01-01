import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listAllBlogs } from '../redux/BlogSlices/BlogListSlice';
import { logOutUser } from '../redux/UserSlices/AuthSlice';

const Navbar = () => {
  const [keyword, setKeyword] = useState('');

  const authUser = useSelector((state) => state.authUser);
  const { isLoggedIn } = authUser;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(listAllBlogs(keyword));
  };

  return (
    <div className="navbar bg-navGreen">
      <div className="container flex flex-col items-center gap-4 py-6 mx-auto md:flex-row md:gap-0 md:justify-between">
        <Link to="/" className="text-xl font-bold logo">
          BlogSpace
        </Link>
        <div className="flex gap-3 search-form">
          <input
            type="text"
            name="search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (e.target.value === '') {
                dispatch(listAllBlogs());
              }
            }}
            id="search"
            className="px-2 rounded outline-none form-control"
            placeholder="Search blogs.."
          />
          <button
            className="px-4 py-1 text-white rounded bg-btnGreen"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
        <div className="flex gap-3 auth-btns">
          {!isLoggedIn ? (
            <>
              {' '}
              <Link
                to="/login"
                className="px-4 py-1 text-white rounded bg-btnGreen"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 text-white rounded bg-btnGreen"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/blog/add"
                className="px-4 py-1 text-white rounded bg-btnGreen"
              >
                Add Blog
              </Link>
              <Link
                to="/profile"
                className="px-4 py-1 text-white rounded bg-btnGreen"
              >
                John Doe
              </Link>
              <button
                className="px-4 py-1 text-white bg-red-500 rounded"
                onClick={() => dispatch(logOutUser())}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
