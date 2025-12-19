import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get all posts
export const getPosts = async (limit = 100) => {
    try {
        const response = await apiClient.get('/posts', {
            params: {
                _limit: limit,
            },
        });
        return response.data;
    } catch (error) {
        console.error('API Error - getPosts:', error.message);
        throw error;
    }
};

// Get single post by ID
export const getPostById = async (id) => {
    try {
        const response = await apiClient.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('API Error - getPostById:', error.message);
        throw error;
    }
};

// Get posts with pagination
export const getPostsPaginated = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get('/posts', {
            params: {
                _page: page,
                _limit: limit,
            },
        });
        return response.data;
    } catch (error) {
        console.error('API Error - getPostsPaginated:', error.message);
        throw error;
    }
};

export default apiClient;
