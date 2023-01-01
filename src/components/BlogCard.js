import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/view/${blog._id}`}
      className="relative flex overflow-hidden rounded md:h-56 md:w-72 blog-card"
    >
      <div className="relative thumbnail">
        <img src={blog.cover} alt="blog" />
      </div>
      <div className="absolute z-20 flex flex-col items-start justify-end w-full h-full p-4 overlay bg-overlay">
        <h4 className="mb-2 text-xl text-white hover:underline">
          {blog.title.substring(0, 46)}...
        </h4>
        <p className="text-sm text-white">
          By {blog.author.first_name} {blog.author.last_name}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
