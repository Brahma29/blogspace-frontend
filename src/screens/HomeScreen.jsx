import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../actions/postActions';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const postsList = useSelector((state) => state.postsList);
  const { loading, error, posts } = postsList;
  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);
  return (
    <>
      <div className="d-flex container-xxl row p-md-4 p-2 mx-auto">
        {/* <div className="w-25">
          <LeftMenu />
        </div> */}
        <div className="home-screen-container col-md-9 col-12  px-md-4 min-vh-100">
          <div className="card w-100  p-4 mb-4">
            <p className="fs-1">
              <strong>Welcome!</strong> To BlogSpace
              https://prod.liveshare.vsengsaas.visualstudio.com/join?7DF1B807760D24B777D3E8B9BD5FDF322D98
            </p>
            <p>Find the latest updates here.</p>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <h1>Oops! Something went wrong! We are on it.</h1>
          ) : posts.length === 0 ? (
            <h2 style={{ textAlign: 'center' }}>No Post To Display</h2>
          ) : (
            <div className="row">
              {posts.map((post) => (
                <div className="col-md-6 col-12 p-1 flex-1">
                  <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    description={post.description}
                    photo={post.photo}
                    author={post.username}
                    publishedOn={post.createdAt}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-3 d-md-block d-none">
          <RightMenu />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
