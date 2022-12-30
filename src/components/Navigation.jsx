import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { listPosts } from '../actions/postActions';

const Navigation = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const [searchType, setSearchType] = useState('All');
  const [keyword, setKeyword] = useState('');
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = () => {
    dispatch(listPosts(searchType, keyword));
  };

  useEffect(() => {
    if (keyword === '') {
      dispatch(listPosts());
    }
  }, [dispatch, keyword]);
  return (
    <>
      <nav className="navbar bg-body-tertiary py-3">
        <div className="container-xxl align-items-center d-flex flex-column flex-md-row row-gap-3 ">
          <Link to="/" className="navbar-brand">
            BlogSpace
          </Link>
          <div className="d-flex">
            <select
              name="search-type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="form-select me-2 w-50"
              id="search-type"
            >
              <option defaultValue value="all">
                All
              </option>
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="author">Author</option>
            </select>
            <input
              className="form-control me-2"
              aria-label="Search"
              type="search"
              id="q"
              placeholder="Search Blog..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="btn btn-dark"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="buttons">
            <ul className="nav-links d-flex gap-3 list-group-horizontal mb-0">
              <li className="nav-links-item list-group-item">
                <Link
                  to="/new-blog"
                  className="text-decoration-none text-light btn btn-dark mb-0"
                >
                  Create Your Blog
                </Link>
              </li>

              {userInfo ? (
                <>
                  <li className="nav-links-item list-group-item">
                    <Link
                      to="/profile"
                      className="text-decoration-none btn btn-dark d-flex align-items-center gap-2"
                    >
                      <i className="fa-solid fa-user"></i>
                      {userInfo.name}
                    </Link>
                  </li>
                  <li className="nav-links-item list-group-item">
                    <button
                      onClick={handleLogOut}
                      className="log-out text-decoration-none btn btn-danger"
                    >
                      <i className="fa-solid fa-power-off"></i>
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-links-item btn btn-dark mb-0">
                  <Link to="/login" className="text-decoration-none text-light">
                    Log In/Sign Up
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* <header className="navigation-bar-container bg-dark d-flex justify-content-between px-4 py-3 align-items-center">
        <div className="nav-items">
          <h1
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
            id="logo"
            className="text-white"
          >
            BlogSpace
          </h1>
        </div>
        <div className="nav-items d-flex align-items-center gap-3">
          <input
            className="search-blog rounded p-1 outline-none form-control"
            type="search"
            id="q"
            placeholder="Search Blog..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="p-1 px-2 rounded btn btn-light"
            id="search-blog"
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: '#3D087B' }}
            ></i>
          </button>
        </div>
        <div className="nav-items">
          <ul className="nav-links d-flex gap-3 list-group-horizontal mb-0">
            <li className="nav-links-item btn btn-light mb-0">
              <Link to="/new-blog" className="text-decoration-none text-dark">
                Create Your Blog
              </Link>
            </li>

            {userInfo ? (
              <>
                <li className="nav-links-item">
                  <Link to="/profile" className="text-decoration-none">
                    <i className="fa-solid fa-user"></i>
                    {userInfo.name}
                  </Link>
                </li>
                <li className="nav-links-item">
                  <button
                    onClick={handleLogOut}
                    className="log-out text-decoration-none"
                  >
                    <i className="fa-solid fa-power-off"></i>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-links-item btn btn-light mb-0">
                <Link to="/login" className="text-decoration-none text-dark">
                  Log In/Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header> */}
    </>
  );
};

export default Navigation;
