import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listTopPosts } from '../actions/postActions';
import Loader from '../components/Loader';

const LeftMenu = () => {
  const dispatch = useDispatch();
  const latestPosts = useSelector((state) => state.latestPosts);
  const { loading, error, posts } = latestPosts;

  useEffect(() => {
    dispatch(listTopPosts());
  }, [dispatch]);
  return (
    <div className="left-menu-generic card">
      <h1 className="top-posts-title card-header fs-4">Latest Posts</h1>
      <div className="card-body">
        {error ? (
          <h1 className="fs-5">Oops! Something went wrong</h1>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <ul className="top-posts-ul list-group list-group-flush">
              {posts.map((post) => (
                <li className="top-posts-li list-group-item" key={post._id}>
                  <Link
                    to={`/view-blog/${post._id}`}
                    className="top-posts-link"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftMenu;
