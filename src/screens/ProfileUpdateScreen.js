import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getUserProfile,
  updateUserProfile,
} from '../redux/UserSlices/UserProfileSlice';
import Loader from '../components/Loader';
import getBase64 from '../utils/ImageHandler';
import { toast } from 'react-toastify';

const ProfileUpdateScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageUploadHandler = async (e) => {
    const baseUrl = await getBase64(e.target.files[0]);
    setImageSrc(baseUrl);
    setFile(e.target.files[0]);
  };

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, userDetails, error, success } = userProfile;

  const authUser = useSelector((state) => state.authUser);
  const { isLoggedIn } = authUser;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setFirstName(userDetails.first_name);
      setLastName(userDetails.last_name);
      setEmail(userDetails.email);
    }
  }, [loading]);

  const submitHandler = () => {
    const form = new FormData();
    form.append('first_name', firstName);
    form.append('last_name', lastName);
    form.append('email', email);
    form.append('file', file);
    dispatch(updateUserProfile({ userId: userDetails._id, user: form }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="min-h-screen container-xl">
          <div className="flex items-center justify-center pt-24 register-form">
            <div className="flex flex-col items-center gap-4 form-container w-96">
              <h1 className="self-start mb-5 text-3xl font-medium">
                Update Profile
              </h1>
              <div className="relative flex items-center justify-center mb-6 overflow-hidden border rounded h-52 thumbnail border-btnGreen w-96">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="thumbnail"
                    className="object-cover w-full h-full rounded"
                  />
                ) : userDetails.profile ? (
                  <img
                    src={userDetails.profile}
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
              <div className="flex w-full gap-2 form-group">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-1/2 p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
                />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-1/2 p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
                />
              </div>
              <div className="w-full form-group ">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full p-2 border rounded outline-none input-field border-btnGreen focus:shadow-sm focus:shadow-btnGreen"
                />
              </div>

              <div className="w-full form-group ">
                <button
                  onClick={submitHandler}
                  className="w-full py-2 font-medium text-white rounded bg-btnGreen"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileUpdateScreen;
