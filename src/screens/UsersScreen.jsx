import React from 'react';
import { Link } from 'react-router-dom';
const UsersScreen = () => {
  return (
    <div className='users-table'>
      <table class='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Mark</td>
            <td>Otto@mail.com</td>
            <td>
              <span>
                <i class='fa-solid fa-user-pen'></i>
              </span>
              <span>
                <i class='fa-solid fa-trash'></i>
              </span>
              <span>
                <i class='fa-solid fa-ban'></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Link to='/' className='go-back'>
        Back
      </Link>
    </div>
  );
};

export default UsersScreen;
