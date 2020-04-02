import {useState} from 'react';

export const useCountry = () => {
    const [value, setValue] = useState('');

    const onChange = ({target}) => setValue(target.value); 

    return {
        value,
        onChange
    }
}