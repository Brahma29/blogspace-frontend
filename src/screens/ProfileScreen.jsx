import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../actions/userActions';
import Loader from '../components/Loader';
import ProfileMenu from '../components/ProfileMenu';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [username, setUsername] = useState(userInfo.username);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateRequest = () => {
    dispatch(updateUser(userInfo._id, username, name, email, newPassword));
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <>
      <div className="container-xxl p-4 d-flex flex-column">
        <ProfileMenu />
        <div className="profile-container mx-auto ">
          <div className="profile-form d-flex flex-column align-items-center gap-3">
            <h1 className="profile-name ">Hi! {username.toUpperCase()}</h1>
            <div className="profile-image">
              <img
                src="https://wallpaperaccess.com/full/7445.jpg"
                alt="Profile Pic"
                className="rounded"
                width={250}
                height={250}
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="name" className="form-label name-warn">
                Username
              </label>
              <input
                type="text"
                className="username form-control"
                id="username"
                placeholder="Username"
                value={username}
                readOnly
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="name" className="form-label name-warn">
                Name
              </label>
              <input
                type="text"
                className="name form-control"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="name" className="form-label name-warn">
                Email
              </label>
              <input
                type="text"
                className="email form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="email" className="form-label email-warn">
                Old Password
              </label>

              <input
                type="text"
                className="password form-control"
                id="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group w-100">
              <label htmlFor="password" className="form-label password-warn">
                Password
              </label>

              <input
                type="text"
                className="confirm-password form-control"
                id="confirm-password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleUpdateRequest}
                  className="signup-btn btn btn-primary"
                  id="signup"
                >
                  Update
                </button>
              </>
            )}

            <Link to="/" className="go-back btn btn-dark">
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
