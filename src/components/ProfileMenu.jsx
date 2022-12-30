import React from 'react';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  return (
    <div className="left-menu-generic">
      {/* <h1 className="top-posts-title">Actions</h1> */}
      <ul className="top-posts-ul d-flex gap-3 p-0">
        <li className="top-posts-li list-group-item">
          <Link to="/new-blog" className="top-posts-link btn btn-dark">
            New Post
          </Link>
        </li>
        <li className="top-posts-li list-group-item">
          <Link to="/profile/myposts" className="top-posts-link btn btn-dark">
            My Posts
          </Link>
        </li>
        {/* <li className='top-posts-li'>
          <Link to='/profile/user-manage' className='top-posts-link'>
            Users
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default ProfileMenu;
