import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUserPosts, deletePostById } from '../actions/postActions';
import Loader from '../components/Loader';

const MyPostsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const userPosts = useSelector((state) => state.userPosts);
  const { loading: postLoading, error: postError, posts } = userPosts;
  const deletePost = useSelector((state) => state.deletePost);
  const { loading: delLoading, error: delError, success } = deletePost;
  const handleEdit = (id) => {
    navigate(`/new-blog/${id}`);
  };

  const handleDelete = (pid) => {
    if (window.confirm('Are you sure to delete the post ? ')) {
      dispatch(deletePostById(pid, userInfo.username));
      if (success) {
        alert('Post Deleted');
      }
    }
  };
  useEffect(() => {
    dispatch(listUserPosts(userInfo.username));
  }, [dispatch, delLoading]);
  return (
    <div className="users-table container-xxl p-4">
      <h1>My Posts</h1>
      {postLoading ? (
        <Loader />
      ) : (
        <table class="table table-striped mb-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Post Title</th>
              <th scope="col">Published On</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <th scope="row">{index + 1}</th>
                <td>{post.title.substring(0, 20) + '...'}</td>
                <td>{post.createdAt.substring(0, 10)}</td>
                <td>
                  <div className="d-flex gap-2">
                    <span>
                      <i
                        onClick={(e) => handleEdit(post._id)}
                        class="fa-solid fa-pen-to-square"
                      ></i>
                    </span>
                    <span>
                      <i
                        onClick={(e) => handleDelete(post._id)}
                        class="fa-solid fa-trash"
                      ></i>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/" className="go-back btn btn-dark">
        Back
      </Link>
    </div>
  );
};

export default MyPostsScreen;
