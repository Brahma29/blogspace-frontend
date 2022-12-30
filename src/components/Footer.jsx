import React from 'react';

const Footer = () => {
  return (
    <div className="footer-container bg-dark d-flex p-md-5 p-2 gap-3 justify-content-between flex-column align-items-center">
      <div className="footer-option-container d-flex">
        <div className="socials d-flex flex-column align-items-center">
          <h3 className="text-white ">Socials</h3>
          <ul className="text-white">
            <li className="list-group-item">
              <a href="#" className="text-decoration-none text-white">
                Facebook
              </a>
            </li>
            <li className="list-group-item">
              <a href="#" className="text-decoration-none text-white">
                Instagram
              </a>
            </li>
            <li className="list-group-item">
              <a href="#" className="text-decoration-none text-white">
                Pinterest
              </a>
            </li>
            <li className="list-group-item">
              <a href="#" className="text-decoration-none text-white">
                Quora
              </a>
            </li>
            <li className="list-group-item">
              <a href="#" className="text-decoration-none text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="suggested-sites text-white">
          <h3>Suggested Websites</h3>
          <ul>
            <li className="list-group-item ">
              <a href="#" className="text-white text-decoration-none">
                Blogger
              </a>
            </li>
            <li className="list-group-item ">
              <a href="#" className="text-white text-decoration-none">
                Wordpress
              </a>
            </li>
            <li className="list-group-item ">
              <a href="#" className="text-white text-decoration-none">
                India Press
              </a>
            </li>
            <li className="list-group-item ">
              <a href="#" className="text-white text-decoration-none">
                Vally Mon
              </a>
            </li>
            <li className="list-group-item ">
              <a href="#" className="text-white text-decoration-none">
                New Blogger
              </a>
            </li>
          </ul>
        </div>
      </div>
      <h2 className="copyright text-white mb-0"> BlogSPace &copy; 2023 </h2>
    </div>
  );
};

export default Footer;
