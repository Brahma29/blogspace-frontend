import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listTopPosts } from '../actions/postActions';
import Loader from '../components/Loader';
const RightMenu = () => {
  const dispatch = useDispatch();
  const latestPosts = useSelector((state) => state.latestPosts);
  const { loading, error, posts } = latestPosts;
  useEffect(() => {
    dispatch(listTopPosts());
  }, [dispatch]);
  return (
    <div className="right-menu-generic card">
      <h1
        className="top-authors-title card-header fs-4"
        style={{ fontSize: '1.5rem' }}
      >
        Top Authors
      </h1>
      <div className="card-body">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="fs-5">Oops! Something went wrong</h1>
        ) : (
          <ul className="top-authors-ul list-group list-group-flush">
            {posts.map((post) => (
              <li key={post._id} className="top-authors-li list-group-item ">
                <Link to="#" className="top-authors-link">
                  {post.username}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RightMenu;
