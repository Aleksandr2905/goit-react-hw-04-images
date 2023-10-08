import axios from "axios";

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '39423334-465aef10dece7a90d90ef79ec';

const instance = axios.create({ baseURL: BASE_URL });


export const fetchRequest = async (query = 'cat', page = 1) => {
    const { data } = await instance.get(`/`,{
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: page,
        }        
    });
    
    return data; 
        
};

