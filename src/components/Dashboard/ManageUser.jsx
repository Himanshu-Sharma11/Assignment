import React, { useEffect, useState } from 'react';
import { DELETE_USER, GET_USERS, UPDATE_USER } from '../Api/api';
import './form.css';
import { useHistory, NavLink } from 'react-router-dom';

const initialValues = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
};
const ManageUser = () => {
  /*use State */
  const [users, setUsers] = useState([]);
  const [editValues, setEditValues] = useState(initialValues);
  const [page, setPage] = useState(0);
  const rowsPerPage = 2;

  /*use History  */
  const history = useHistory();

  //  Delete user via  api  //
  /*const disable = async (id) => {
    try {
      const res = await DELETE_USER(id);
      console.log(res);
      setUsers([]);
    } catch (error) {
      console.log(error);
    }
   };*/

  //edit user via api  //
  /*const Edit = async (post) => {
    try {
      const res = await UPDATE_USER(post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };*/

  /**delete functionality local */
  const disable = (id) => {
    const filtered = users.filter((el) => {
      return el.id !== id;
    });
    setUsers(filtered);
  };

  /*passing the values in modal form */
  const passValue = (el) => {
    setEditValues({
      id: el.id,
      first_name: el.first_name,
      last_name: el.last_name,
      email: el.email,
    });
  };

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Edit(editValues);
    const edited = users.map((el) => {
      if (el.id === editValues.id) {
        el.id = editValues.id;
        el.first_name = editValues.first_name;
        el.last_name = editValues.last_name;
        el.email = editValues.email;
      }
      return el;
    });
    setUsers(edited);
    setEditValues(initialValues);
  };

  /*for the next button in pagination  */
  const count = () => {
    let number;
    if (users.length % 2 === 0) {
      number = users.length / rowsPerPage;
    } else {
      number = Math.ceil(users.length / rowsPerPage);
    }

    return number;
  };
  /*pagination */
  const pagination = () => (
    <nav>
      <ul className='pagination'>
        <li className={`page-item ${page === 0 ? `disabled` : null}`}>
          <a
            className='page-link'
            href='#1'
            onClick={() => setPage(page - 1)}
            tabIndex='-1'
          >
            Previous
          </a>
        </li>
        <li
          className='page-item  active'
          style={{ position: 'relative', zIndex: '-1' }}
        >
          <a className='page-link' href='#3'>
            {page + 1}
          </a>
        </li>

        <li className={`page-item ${page + 1 === count() ? 'disabled' : null}`}>
          <a
            className={`page-link`}
            href='#2'
            tabIndex='-1'
            onClick={() => setPage(page + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
  /**modal  */
  const modal = () => (
    <div className='modal fade' id='editModal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Edit user</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>

          <div className='modal-body'>
            <form autoComplete='off'>
              <div className='form-group my-3'>
                <label className='form-label fw-bold fs-6'>Edit Name</label>
                <input
                  type='text'
                  name='first_name'
                  value={editValues.first_name}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
              <div className='form-group my-3'>
                <label className='form-label fw-bold fs-6'>Edit Name</label>
                <input
                  type='text'
                  name='last_name'
                  value={editValues.last_name}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
              <div className='form-group my-3'>
                <label className='form-label fw-bold fs-6'>Edit Email</label>
                <input
                  type='email'
                  name='email'
                  value={editValues.email}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
            </form>
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Dismiss
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /*use Effect */
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      history.push('/');
    }
  }, [history]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const {
          data: { data },
        } = await GET_USERS();
        if (data) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (users.length === 0) {
      getUsers();
    }
  }, [users, setUsers]);

  return (
    <div className='container mt-5'>
      <div style={{ textAlign: 'right' }}>
        <NavLink to='/add_User'>
          <button className=' btn btn-lg btn-warning rounded-0  text-white'>
            ADD
          </button>
        </NavLink>
      </div>
      {users ? (
        <div className='mt-3  table-responsive'>
          <table className='table table-light table-responsive'>
            <thead className='table-head'>
              <tr>
                <th>Id</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((el) => {
                  return (
                    <tr key={el.id}>
                      <td>{el.id}</td>
                      <td>{`${el.first_name}  ${el.last_name}`}</td>
                      <td>{el.email}</td>
                      <td>admin</td>
                      <td>
                        <button
                          className='btn btn-link text-dark'
                          onClick={() => disable(el.id)}
                        >
                          Disable
                        </button>{' '}
                        |
                        <button
                          className='btn btn-link text-dark'
                          data-bs-toggle='modal'
                          data-bs-target='#editModal'
                          onClick={() => passValue(el)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>{modal()}</div>
          <div>{pagination()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default ManageUser;
