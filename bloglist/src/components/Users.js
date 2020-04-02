import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const Users = () => {
    const users = useSelector(state => state.users);

    return (
        <div className='users'>
            <h1>Users</h1>
            <hr />
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(x => 
                        <tr key={x.id}>
                            <td>
                                <Link to={`/users/${x.id}`}>
                                    {x.name}
                                </Link>
                            </td>
                            <td>{x.blogs.length}</td>
                        </tr>    
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users;