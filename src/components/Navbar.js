import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/UserSlices/userSlice";
import { saveBlogs } from "../redux/BlogSlices/blogSlice";
import { getPosts } from "../services/blog";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");

  const { data: userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const fetchBlogs = async (keyword) => {
    try {
      const { data } = await getPosts(keyword);
      dispatch(saveBlogs(data.doc.posts));
    } catch (error) {
      console.log({ error });
    }
  };
  const handleSubmit = async () => {
    fetchBlogs(keyword);
  };

  const onChange = (e) => {
    setKeyword(e.target.value);
    if (e.target.value === "") {
      fetchBlogs();
    }
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
            onChange={onChange}
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
          {!userInfo ? (
            <>
              {" "}
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
                {userInfo.first_name}
              </Link>
              <button
                className="px-4 py-1 text-white bg-red-500 rounded"
                onClick={() => dispatch(logOut())}
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
