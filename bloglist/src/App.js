import React, {useEffect} from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import loginServices from './services/login';
import './App.scss';
import {useSelector, useDispatch} from 'react-redux';
import {loginU} from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    if(loggedUser) {
      loginServices.findUser(loggedUser.username)
        .then(() => {
          dispatch(loginU(loggedUser));
        });
    }
    console.log(user);
  },[dispatch]);

  if(user) {
    return (
      <div>
        <Blogs />
      </div>
    )
  } else {
    return (
      <div>
        <Login />
      </div>
    )
  }
};

export default App;
