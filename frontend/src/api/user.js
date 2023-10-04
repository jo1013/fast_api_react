import axios from 'axios';

const baseURL = 'http://yourbackendurl.com/api';

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/signup`, userData);
        if (response.status === 201) {
            return { success: true, data: response.data };
        }
        return { success: false, error: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response ? error.response.data : error.message,
        };
    }
};
