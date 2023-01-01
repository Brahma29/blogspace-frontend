import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import { BiExit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBlog, updateBlog } from '../redux/BlogSlices/BlogUpdateSlice';
import { getBlogById } from '../redux/BlogSlices/SingleBlogSlice';

const EditorpageScreen = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState(RichTextEditor.createEmptyValue());
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [title, setTitle] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = '';
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const onArticleChange = (article) => {
    setArticle(article);
  };

  const imageUploadHandler = async (e) => {
    const baseUrl = await getBase64(e.target.files[0]);
    setImageSrc(baseUrl);
    setFile(e.target.files[0]);
  };

  const singleBlog = useSelector((state) => state.singleBlog);
  const { loading, blog, error } = singleBlog;

  const authUser = useSelector((state) => state.authUser);
  const { isLoggedIn } = authUser;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }

    if (id) {
      dispatch(getBlogById(id));
    }
  }, [id]);

  useEffect(() => {
    if (!loading) {
      setTitle(blog.title);
      setArticle(RichTextEditor.createValueFromString(blog.article, 'html'));
    }
  }, [loading]);

  const submitHandler = () => {
    let articleStr = article.toString('html');
    const form = new FormData();
    form.append('title', title);
    form.append('article', articleStr);
    form.append('file', file);
    if (id) {
      dispatch(updateBlog({ postId: id, blog: form }));
    } else {
      dispatch(addNewBlog(form));
    }
  };

  const cancelHandler = () => {
    setTitle('');
    setArticle(RichTextEditor.createEmptyValue());
    navigate('/');
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 p-2 py-8 row md:flex-row">
          <div className="col">
            <Link to="/">
              <BiExit className="text-2xl rotate-180 text-btnGreen" />
            </Link>
          </div>
          <div className="col">
            <div className="relative flex items-center justify-center mb-6 overflow-hidden border rounded h-52 thumbnail border-btnGreen w-96">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="thumbnail"
                  className="object-cover w-full h-full rounded"
                />
              ) : id && blog ? (
                <img
                  src={blog.cover}
                  alt="thumbnail"
                  className="object-cover w-full h-full rounded"
                />
              ) : (
                <p>Upload Thumbnail</p>
              )}
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                placeholder="Choose Thumbnail"
                onChange={(e) => imageUploadHandler(e)}
                className="absolute w-full h-full opacity-0"
              />
            </div>

            <div className="mb-4 title-form">
              <textarea
                type="text"
                name="title"
                id="title"
                className="w-full p-2 text-4xl font-bold rounded outline-none"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <RichTextEditor
              value={article}
              onChange={onArticleChange}
              editorClassName="h-96"
            />
            <div className="flex gap-3 mt-6 buttons">
              <button
                onClick={submitHandler}
                className="px-8 py-1 text-white rounded bg-btnGreen"
              >
                Post
              </button>
              <button
                onClick={cancelHandler}
                className="px-8 py-1 text-white bg-gray-900 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorpageScreen;
