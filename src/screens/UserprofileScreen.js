import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/UserSlices/UserProfileSlice';
import Loader from '../components/Loader';
import { listUserBlogs } from '../redux/BlogSlices/BlogListSlice';
import axiosInstance from '../apiConfig/axiosInstance';
import { toast } from 'react-toastify';
import { RiEditBoxFill } from 'react-icons/ri';

const UserprofileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, userDetails, error } = userProfile;

  const authUser = useSelector((state) => state.authUser);
  const { isLoggedIn } = authUser;

  const blogList = useSelector((state) => state.blogList);
  const { loading: blogsLoading, blogs, error: blogsError } = blogList;

  const deletePost = async (postId) => {
    axiosInstance
      .delete(`/posts/${postId}`)
      .then((res) => {
        if (res.data.success) {
          toast.success('Post Deleted Successfully!');
          dispatch(listUserBlogs());
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    dispatch(getUserProfile());
    dispatch(listUserBlogs());
  }, [dispatch]);

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <div className="container p-8 mx-auto">
            <div className="flex flex-col items-center min-h-screen gap-8 row md:items-start md:flex-row">
              <div className="pr-4 border-r col">
                <div className="relative mb-3 profile-pic">
                  <img
                    src={userDetails.profile}
                    alt="profile-pic"
                    className="object-cover mb-4 border w-72 h-72 border-btnGreen border-opacity-40"
                  />
                  <Link
                    to="/update-profile"
                    className="flex items-center gap-3 p-2 text-white rounded bg-btnGreen"
                  >
                    <RiEditBoxFill className="text-3xl" /> Update Profile
                  </Link>
                </div>
                <p className="text-xl">Total Posts : {blogs.length}</p>
              </div>
              <div className="w-full col md:w-auto">
                <h1 className="mb-4 text-4xl">
                  {userDetails.first_name} {userDetails.last_name}
                </h1>
                <p>Manage your posts</p>
                <div className="w-full mt-6 overflow-x-auto post md:mt-12">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="text-xl text-left uppercase">Title</th>
                        <th className="text-xl text-left uppercase ">
                          Published On
                        </th>
                        <th className="text-xl text-left uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog) => (
                        <tr>
                          <td className="pr-16 md:w-80">{blog.title}</td>
                          <td className="pr-16 md:w-52">
                            {blog.createdAt.substring(0, 10)}
                          </td>
                          <td>
                            <div className="flex gap-3 buttons">
                              <Link
                                to={`/blog/edit/${blog._id}`}
                                className="px-4 py-1 text-white rounded bg-btnGreen"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => deletePost(blog._id)}
                                className="px-4 py-1 text-white bg-red-600 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserprofileScreen;
