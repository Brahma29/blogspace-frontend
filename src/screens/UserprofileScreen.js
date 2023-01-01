/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RiEditBoxFill } from 'react-icons/ri';
import { getUserPosts, removePost } from '../services/blog';

const UserprofileScreen = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const userInfo = useSelector((state) => state.userInfo);

  const fetchUserPosts = async () => {
    try {
      const { data } = await getUserPosts();
      setBlogs(data.docs);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      await removePost(postId);
      await fetchUserPosts();
      toast.success('Post Deleted Successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!userInfo.data) {
      navigate('/login');
    } else {
      fetchUserPosts();
    }
  }, []);

  return (
    userInfo &&
    userInfo.data && (
      <div>
        <div>
          <div className="container p-8 mx-auto">
            <div className="flex flex-col items-center min-h-screen gap-8 row md:items-start md:flex-row">
              <div className="pr-4 border-r col">
                <div className="relative mb-3 profile-pic">
                  <img
                    src={userInfo.data.profile}
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
                  {userInfo.data.first_name} {userInfo.data.last_name}
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
                        <tr key={blog._id}>
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
        </div>
      </div>
    )
  );
};

export default UserprofileScreen;
