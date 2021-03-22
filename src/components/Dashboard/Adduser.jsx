import React, { useEffect } from 'react';
import Inputs from '../Assets/Inputs';
import useType from '../Assets/useType';
import useValues from '../Assets/useValues';
import { useHistory } from 'react-router-dom';
import './form.css';
import { CREATE } from '../Api/api';

const initialState = {
  userName: '',
  email: '',
  contact: '',
  password: '',
};

const Adduser = () => {
  const { type, setType } = useType();
  const { values, setValues, handleChange, handleClear } = useValues(
    initialState
  );
  const { userName, email, contact, password } = values;
  const history = useHistory();

  const createUser = async (post) => {
    try {
      const {
        config: { data },
      } = await CREATE(post);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  /*handle Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(values);
    setValues(initialState);
  };

  /*use Effect */
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      history.push('/');
    }
  }, [history]);

  return (
    <section className='container'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div className='row mt-5 p-3  border border-2'>
          <div className='col-12 col-md-6 my-3'>
            <Inputs
              label={'Enter Name'}
              type={'text'}
              name={'userName'}
              value={userName}
              handleChange={handleChange}
              className={
                'form-control border border-2 border-warning rounded-0'
              }
            />
          </div>

          <div className='col-12 col-md-6 form-group my-3'>
            <Inputs
              label={'Enter Email'}
              type={'email'}
              name={'email'}
              value={email}
              handleChange={handleChange}
              className={
                'form-control border border-2 border-warning rounded-0'
              }
            />
          </div>

          <div className='col-12 col-md-6 form-group my-3'>
            <Inputs
              label={'Enter Contact no'}
              type={'number'}
              name={'contact'}
              value={contact}
              handleChange={handleChange}
              className={
                'form-control border border-2 border-warning rounded-0'
              }
            />
          </div>

          <div
            className='col-12 col-md-6 form-group my-3'
            style={{ position: 'relative' }}
          >
            <Inputs
              label={'Enter Password'}
              type={type ? 'text' : 'password'}
              name={'password'}
              value={password}
              handleChange={handleChange}
              className={
                'form-control border border-2 border-warning rounded-0'
              }
            />
            {type ? (
              <i
                className='fas fa-eye-slash eye'
                onClick={() => setType(false)}
              ></i>
            ) : (
              <i className='fas fa-eye eye' onClick={() => setType(true)}></i>
            )}
          </div>
        </div>
        <div className='mt-3'>
          <button
            className='btn btn-warning btn-large rounded-0 text-white btn-lg mx-2'
            type='submit'
          >
            Submit
          </button>
          <button
            className='btn btn-warning btn-large rounded-0 text-white btn-lg mx-2'
            type='reset'
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default Adduser;
