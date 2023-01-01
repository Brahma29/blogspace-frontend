import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getPosts } from "../services/blog";
import { saveBlogs } from "../redux/BlogSlices/blogSlice";

const HomepageScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { data: blogs } = useSelector((state) => state.blogs);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await getPosts();
      dispatch(saveBlogs(data.doc.posts));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loader />
      ) : blogs ? (
        blogs.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <h1>No Blogs to show</h1>
          </div>
        ) : (
          <div className="container min-h-screen px-2 py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-btnGreen">
              Today's Updates
            </h1>
            <div className="flex card">
              <div className="grid items-start justify-center grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default HomepageScreen;
