import React, {useState} from 'react';
import loginService from '../services/login';
import {useDispatch} from 'react-redux';
import {loginU} from '../reducers/userReducer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({username,password});
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedUser',JSON.stringify(user));
      dispatch(loginU(user));
    } catch(e) {
      setError('Invalid username or password');
      setTimeout(() => setError(null), 3000);
    }
  };

  return(
    <div className="login">
      <div>
        <h2>Log in </h2>
        <ErrorMessage error={error} />
        <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Login'/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button id="LogIn">Log In</button>
        </form>
      </div>
    </div>
  );
};

const ErrorMessage = ({error}) => {
  if(error) {
    return(
      <h2 className="error">{error}</h2>
    );
  } else {
    return '';
  }
};

export default Login;