import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { getPostById } from '../actions/postActions';

const PostViewScreen = () => {
  const [postLoading, setPostLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const listPostById = useSelector((state) => state.listPostById);
  const { loading, error, post } = listPostById;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, error: userError, userInfo } = userLogin;

  useEffect(() => {
    dispatch(getPostById(id));
    setTimeout(() => {
      setPostLoading(loading);
    }, 1000);
  }, [dispatch, id]);
  return (
    <div className="new-blog-container container-xxl p-md-4 p-2">
      <div className="new-blog-form">
        {postLoading ? (
          <Loader />
        ) : (
          <>
            <div className="row mx-auto mb-3">
              <div className="post-image col-md-3 col-12">
                <img src={post.photo} alt={post.photo} className="w-100 " />
              </div>
            </div>
            <h1
              id="post-title"
              cols="30"
              rows="1"
              className="new-post-title view-post-form mb-2"
            >
              {post.title}
            </h1>
            <div className="author-details mb-4">
              Posted By : {post.username.toUpperCase()}
            </div>

            <p
              name="post-body"
              id="post-body"
              className="post-body view-post-form"
              placeholder="Post Body........."
              readOnly
            >
              {post.description}
            </p>
            <label
              htmlFor="post-body"
              className="post-body-warn form-label"
            ></label>
            {userInfo && userInfo.username === post.username && (
              <button
                onClick={(e) => navigate(`/new-blog/${id}`)}
                className="clear-form btn btn-dark me-3"
              >
                Edit
              </button>
            )}

            <button
              onClick={(e) => navigate('/')}
              className="submit-post btn btn-dark"
              id="back-post"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostViewScreen;
