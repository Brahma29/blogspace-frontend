import React, { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { listAllBlogs } from '../redux/BlogSlices/BlogListSlice';
import Loader from '../components/Loader';

const HomepageScreen = () => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, blogs, error } = blogList;

  useEffect(() => {
    dispatch(listAllBlogs());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : blogs.length === 0 ? (
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
              {/* <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomepageScreen;
