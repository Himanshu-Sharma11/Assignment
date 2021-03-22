import React, { useState } from 'react';
import logo from '../../../images/logo.png';
import './Header.css';
import { useLocation, NavLink, useHistory } from 'react-router-dom';

const Header = (props) => {
  /*use Location */
  const location = useLocation();
  let header = location.pathname.split('/').join('');
  header = header.split('_').join(' ');
  if (header === '') {
    header = 'Login';
  }

  /*use State */
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState('');

  /*use history */
  const history = useHistory();

  /*token consideration */
  const token = localStorage.getItem('Token');

  /*logout functionality */
  const logOut = () => {
    localStorage.removeItem('Token');
    history.push('/');
  };

  /*handle submit  */
  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword('');
  };

  /**modal  */
  const modal = () => (
    <div className='modal fade' id='password' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Change Password
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form autoComplete='off' onSubmit={handleSubmit}>
              <div className='form-group my-2'>
                <label className='form-label fw-normal '>Your Email</label>
                <input
                  type='email'
                  defaultValue={token}
                  readOnly
                  className='form-control'
                />
              </div>

              <div className='form-group my-2'>
                <label className='form-label fw-normal '>Your Password</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='form-control'
                />
              </div>
              <div className='form-group my-3'>
                <button type='submit' className='btn btn-info text-white'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className='container-fluid root p-0 m-0'>
      <div className='row h-100 m-0'>
        {/*side bar nav */}
        <nav
          className={` col-md-2  shadow  py-3  h-100 bg-light side-nav ${
            toggle ? 'active' : null
          }`}
          id='sidebar'
          style={{ height: '100%' }}
        >
          <a href='#brand' className='navbar-brand'>
            <img src={logo} alt='logo' className='img-fluid' />
          </a>
          <div className='d-flex underImage'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className='mt-4 px-2'>
            <p className='text-secondary fw-bold text-uppercase  '>DashBoard</p>
            {header === 'add User' || header === 'manage User' ? (
              <ul className=' nav flex-column mt-3'>
                <li className='nav-item my-2  fw-normal fs-6  text-muted'>
                  <i className='fas fa-user-plus  text-primary'></i> &nbsp;
                  &nbsp;
                  <NavLink to='/add_User'>Add user</NavLink>
                </li>
                <li className='nav-item my-2 fw-normal fs-6 text-muted '>
                  <i className='fas fa-users-cog text-primary'></i> &nbsp;
                  &nbsp;
                  <NavLink to='/manage_User'>Manage User</NavLink>
                </li>
              </ul>
            ) : (
              <ul className=' nav flex-column mt-3'>
                <li className='nav-item my-2 fw-normal fs-6 text-muted '>
                  <i className='fas fa-sign-in-alt text-primary'></i> &nbsp;
                  &nbsp; <NavLink to='/'>login</NavLink>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <section className='px-0 section' style={{ height: '100%' }}>
          <div className='banner d-flex flex-column justify-content-around px-3'>
            {token ? (
              <div
                className='text-end text-white'
                style={{ cursor: ' pointer' }}
              >
                <span>{token && `Hello, ${token} |`}</span>
                <span data-bs-toggle='modal' data-bs-target='#password'>
                  {' '}
                  Change Password |{' '}
                </span>
                <span onClick={logOut}>Logout</span>
              </div>
            ) : (
              <div className='text-end text-white'></div>
            )}
            <div className='text-white d-flex justify-content-between  align-items-center'>
              <h6 className='text-uppercase text-white fs-5'>{header}</h6>
              <button
                className='btn btn-transparent text-white  d-block d-lg-none '
                onClick={() => setToggle(!toggle)}
              >
                <i className='fas fa-align-justify'></i>
              </button>
            </div>
          </div>
          {props.children}
        </section>
      </div>
      <div>{modal()}</div>
    </div>
  );
};

export default Header;
