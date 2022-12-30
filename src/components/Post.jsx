import React from 'react';
import { Link } from 'react-router-dom';
const Post = ({ id, title, description, photo, author, publishedOn }) => {
  return (
    <>
      <Link to={`/view-blog/${id}`} className="text-decoration-none">
        <div
          className="card position-relative d-flex flex-column justify-content-end"
          style={{
            height: '18rem',
          }}
        >
          <img
            src={photo}
            alt={title}
            className="w-100 h-100 object-fit-cover position-absolute"
          />
          <div className="overlay position-absolute  w-100 h-100 opacity-75 shadow"></div>
          <p className="fs-4 text-white position-relative mx-4 mb-4">
            {title.substring(0, 50)}
          </p>
          {/* <p className="fs-5 text-white position-relative ms-2">
            {description.substring(0, 16)}
          </p> */}
        </div>
      </Link>

      {/* <div className="post-container d-flex w-100 align-items-center border rounded p-3">
        <div className="post-image w-25 ">
          <img src={photo} alt={photo} className="img-fluid" />
        </div>
        <div className="d-flex flex-column gap-2">
          <h1 className="post-title fs-2">{title}</h1>
          <p className="post-content fs-5">
            {description.substring(0, 100) + '...'}
          </p>

          <p className="about-post">
            <strong>Published By : </strong>
            {author} <span> </span>
            <strong> Published On :</strong> {publishedOn.substring(0, 10)}
          </p>
          <Link to={`/view-blog/${id}`} className="link">
            Read full article
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default Post;
