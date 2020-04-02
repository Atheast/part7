import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users';

export const getAll = async() => {
    const res = await axios.get(baseUrl);
    return res.data
}