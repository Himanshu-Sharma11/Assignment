import React, { useEffect } from 'react';
import { LOGIN } from '../Api/api';
import Inputs from '../Assets/Inputs';
import useType from '../Assets/useType';
import useValues from '../Assets/useValues';
import { useHistory } from 'react-router-dom';
import './form.css';

const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const { type, setType } = useType();
  const { values, setValues, handleChange } = useValues(initialState);
  const { email, password } = values;
  const history = useHistory();

  const loginUser = async (post) => {
    try {
      const {
        config: { data },
      } = await LOGIN(post);

      if (data) {
        localStorage.setItem('Token', values.email);
        setValues(initialState);
        history.push('/add_User');
      }
    } catch (error) {
      console.log(error);
    }
  };
  /*handle Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(values);
  };
  /*use Effect */
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      history.push('/add_User');
    }
  }, [history]);
  return (
    <section className='container'>
      <form onSubmit={handleSubmit}>
        <div className='row mt-5 p-3 '>
          <div className='col-12  form-group my-3'>
            <Inputs
              label={'Enter email'}
              type={'email'}
              name={'email'}
              value={email}
              handleChange={handleChange}
              className={
                'form-control border border-2 border-warning rounded-0'
              }
            />
          </div>

          <div
            className='col-12  form-group my-3'
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

          <div className='mx-3'>
            <button
              type='submit'
              className='btn btn-lg btn-warning text-white rounded-0'
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
