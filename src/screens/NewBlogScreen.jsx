import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  getPostById,
  createPost,
  updateUserPost,
  listPosts,
} from '../actions/postActions';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const NewBlogScreen = () => {
  const [postLoading, setPostLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [fileNameForUser, setFileNameForUser] = useState(null);
  const [postBody, setPostBody] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pid = params.id;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, error: userError, userInfo } = userLogin;
  const listPostById = useSelector((state) => state.listPostById);
  const { loading, error, post } = listPostById;
  const createNewPost = useSelector((state) => state.createNewPost);
  const {
    loading: newPostLoading,
    error: newPostError,
    post: newPost,
  } = createNewPost;
  const updatePost = useSelector((state) => state.updatePost);
  const {
    loading: updatePostLoading,
    error: updatePostError,
    post: updatedPost,
  } = updatePost;
  //updatePost
  const createNewPosts = () => {
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', postBody);
    formdata.append('username', userInfo.username);
    formdata.append('file', file);
    formdata.append('image', image);
    if (pid) {
      if (title !== '' && postBody !== '') {
        dispatch(updateUserPost(pid, formdata));
        dispatch(listPosts());
        if (updatedPost) {
          toast.success('Post Updated Successfully');
        }
        navigate('/');
      } else {
        toast.error('Please Add Mandatory Fields');
      }
    } else {
      if (title !== '' && postBody !== '') {
        console.log(formdata.get('title'));
        dispatch(createPost(formdata));
        dispatch(listPosts());
        if (newPost) {
          toast.success('Post Uploaded Successfully');
        }
        navigate('/');
      } else {
        toast.error('Please Add Mandatory Fields');
      }
    }
  };

  const handleDiscard = () => {
    if (
      window.confirm(
        'Your Changes Will Not Be Saved. Are your sure to discard ?'
      )
    ) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (pid) {
        dispatch(getPostById(pid));
        setTimeout(() => {
          setPostLoading(loading);
          setTitle(post.title);
          setPostBody(post.description);
          setFile(post.photo);
        }, 1000);
      } else {
        setTitle('');
        setPostBody('');
      }
    } else {
      navigate('/login');
    }
  }, [dispatch, pid]);
  return userLoading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <div className="new-blog-container container-xxl p-4">
        <div className="new-blog-form d-flex flex-column align-items-center">
          <h1 className="new-post-title mx-auto mb-3">
            {pid ? 'Update Post' : 'New Post'}
          </h1>
          <span>{error && error}</span>
          <div className="form-group w-100">
            <textarea
              name="post-title"
              id="post-title"
              cols="30"
              rows="1"
              className="new-post-title form-control mb-2"
              placeholder="Post Title.........."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <label
              htmlFor="new-post-title"
              className="post-title-warn form-label"
            >
              {newPostError
                ? newPostError
                : updatePostError
                ? updatePostError
                : ''}
            </label>
          </div>
          <div className="form-group w-100 mb-3">
            {pid ? (
              postLoading ? (
                <Loader />
              ) : (
                <div className="post-image">
                  <img src={post.photo} alt={post.photo} />
                </div>
              )
            ) : (
              ''
            )}
            <label
              htmlFor="post-thumb"
              className="form-label new-post-image-container"
            >
              Upload Cover Photo
            </label>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileNameForUser(e.target.files[0].name);
              }}
              className="post-thumb form-control"
              placeholder="Upload Cover Photo"
              id="post-thumb"
            />
          </div>
          <p>OR</p>
          <div className="form-group w-100">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder={pid ? 'Update Cover' : 'Add Cover Url'}
              className="post-cover form-control"
            />
          </div>
          <div className="form-group w-100">
            <label
              htmlFor="post-thumb"
              className="form-label post-thumb-warn"
            ></label>
            <textarea
              name="post-body"
              id="post-body"
              cols="30"
              rows="10"
              className="post-body form-control"
              placeholder="Post Body........."
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            ></textarea>
          </div>
          <label
            htmlFor="post-body"
            className="post-body-warn form-label"
          ></label>
          <div className="form-group d-flex gap-4 mt-3">
            {newPostLoading || updatePostLoading ? (
              <Loader />
            ) : (
              <button
                onClick={createNewPosts}
                className="submit-post btn btn-dark"
                id="submit-post"
              >
                {pid ? 'Update' : 'Post'}
              </button>
            )}

            <button onClick={handleDiscard} className="clear-form btn btn-dark">
              Discard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlogScreen;
