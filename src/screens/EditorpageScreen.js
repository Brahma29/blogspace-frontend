/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import { BiExit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addPost, editPost, getPostById } from '../services/blog';
import { toast } from 'react-toastify';
import getBase64 from '../utils/ImageHandler';

const EditorpageScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [article, setArticle] = useState(RichTextEditor.createEmptyValue());
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [title, setTitle] = useState('');
  const { id } = useParams();

  const onArticleChange = (article) => {
    setArticle(article);
  };

  const imageUploadHandler = async (e) => {
    const baseUrl = await getBase64(e.target.files[0]);
    setImageSrc(baseUrl);
    setFile(e.target.files[0]);
  };

  const userInfo = useSelector((state) => state.userInfo);

  const submitHandler = async () => {
    let articleStr = article.toString('html');
    const form = new FormData();
    form.append('title', title);
    form.append('article', articleStr);
    form.append('file', file);
    try {
      if (id) {
        await editPost(id, form);
      } else {
        await addPost(form);
      }
      toast.success(`Post ${id ? 'updated' : 'added'} successfully`);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelHandler = () => {
    setTitle('');
    setArticle(RichTextEditor.createEmptyValue());
    navigate('/');
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await getPostById(id);
      setTitle(data.doc.title);
      setArticle(
        RichTextEditor.createValueFromString(data.doc.article, 'html')
      );
      setImageSrc(data.doc.cover);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo.data) {
      navigate('/login');
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
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
