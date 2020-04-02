import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {logoutU} from '../reducers/userReducer';
import {Link} from 'react-router-dom';

const Navigation = () => {
    const username = useSelector(state => state.user.username);
    const dispatch = useDispatch();

    return (
        <div className="nav">
            <Link to='/'>Blogs</Link>
            <Link to='/users'>Users</Link>
            <p><b>{username}</b> is logged in</p>
            <button onClick={() => dispatch(logoutU())}>Log Out</button>
        </div>
    )
}

export default Navigation;