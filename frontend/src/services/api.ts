import axios from 'axios';
import { SecretResponse } from '../types';
import { config } from '../config';

const api = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export const createSecret = async (secret: string, ttl: string): Promise<SecretResponse> => {
    const ttlSeconds = ttl.toLowerCase() === 'two weeks' ? 1209600 : 
                      ttl.toLowerCase() === 'week' ? 604800 :
                      ttl.toLowerCase() === 'day' ? 86400 : 3600;

    const response = await api.post<SecretResponse>('/api/set_password/', {
        password: secret,
        ttl: ttlSeconds
    });
    
    // Extract token from backend URL and create frontend URL
    const token = response.data.link.split('/').pop();
    const newLink = `${window.location.origin}/${token}`;
    return { ...response.data, link: newLink };
};

export const getSecret = async (token: string): Promise<string> => {
    try {
        const response = await api.get(`/api/v2/passwords/${token}`);
        if (response.data && response.data.password) {
            return response.data.password;
        }
        throw new Error('Invalid response format');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Secret not found or expired');
        }
        throw error;
    }
};

export const checkSecret = async (token: string): Promise<boolean> => {
    try {
        const response = await api.get(`/api/v2/passwords/${token}`);
        return response.status === 200;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return false;
        }
        throw error;
    }
}; 