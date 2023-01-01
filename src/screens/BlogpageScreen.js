import React, { useState, useEffect, useCallback } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from '../redux/BlogSlices/SingleBlogSlice';
import { addComment } from '../redux/BlogSlices/CommentSlice';
import { likePost } from '../redux/BlogSlices/LikePostSlice';
import Loader from '../components/Loader';

const BlogpageScreen = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();

  const singleBlog = useSelector((state) => state.singleBlog);
  const { loading, blog, error } = singleBlog;

  const authUser = useSelector((state) => state.authUser);
  const { isLoggedIn } = authUser;

  const likeHandler = () => {
    dispatch(likePost(blog._id));
    dispatch(getBlogById(id));
  };

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch]);

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(addComment({ comment, blogId: blog._id }));
    dispatch(getBlogById(id));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 p-4 row md:flex-row md:py-8 md:gap-8">
            <div className="col">
              <button>
                <Link to="/">
                  <BiExit className="text-2xl rotate-180 text-btnGreen" />
                </Link>
              </button>
            </div>
            <div className="col">
              <div className="title">
                <h1 className="mb-3 text-2xl font-bold md:text-5xl md:w-3/4">
                  {blog.title}
                </h1>
                <p className="text-xl font-medium">
                  By {blog.author.first_name} {blog.author.last_name}
                </p>
                <div className="my-8 article md:w-3/4">
                  <div
                    className="mt-10 article-text"
                    dangerouslySetInnerHTML={{ __html: blog.article }}
                  />
                </div>
                <div className="flex items-center gap-3 mb-4 article-btns">
                  <p>{blog.likes.length} Likes</p>
                  <button onClick={likeHandler}>
                    <AiFillLike className="text-4xl text-btnGreen" />
                  </button>
                </div>
                <div className="p-4 bg-gray-200 border rounded comment md:w-96 border-btnGreen border-opacity-60">
                  <div className="reviews-container">
                    <h1 className="mb-6 text-2xl">Comments</h1>
                    {blog.comments.length === 0 ? (
                      <h1>Be first to comment</h1>
                    ) : (
                      blog.comments.map((review) => (
                        <div className="review" key={review._id}>
                          <strong className="mb-1 name">
                            {review.author.first_name}
                          </strong>
                          <div className="text-sm comment">
                            {review.comment}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="add-review">
                    {isLoggedIn ? (
                      <form
                        onSubmit={(e) => submithandler(e)}
                        className="flex flex-col items-start w-full gap-3 mt-4"
                      >
                        <textarea
                          type="text"
                          name="comment"
                          value={comment}
                          className="w-full p-2 text-sm rounded outline-none"
                          onChange={(e) => setComment(e.target.value)}
                          id="comment"
                          placeholder="Add your review.."
                        />
                        <button className="px-4 py-1 text-white rounded bg-btnGreen">
                          Submit
                        </button>
                      </form>
                    ) : (
                      <h1 className="mt-4 text-xl font-semibold">
                        Please login to comment
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogpageScreen;
