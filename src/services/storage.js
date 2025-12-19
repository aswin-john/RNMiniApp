import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { STORAGE_KEYS } from '../utils/constants';

// Save posts to local storage
export const savePosts = async (posts) => {
    try {
        const jsonValue = JSON.stringify(posts);
        await AsyncStorage.setItem(STORAGE_KEYS.POSTS, jsonValue);
        console.log('Posts saved to cache');
    } catch (error) {
        console.error('Error saving posts:', error);
    }
};

// Get cached posts from local storage
export const getCachedPosts = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.POSTS);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error reading cached posts:', error);
        return [];
    }
};

// Check if device is online
export const checkNetworkStatus = async () => {
    try {
        const state = await NetInfo.fetch();
        return state.isConnected && state.isInternetReachable;
    } catch (error) {
        console.error('Error checking network status:', error);
        return false;
    }
};

// Subscribe to network status changes
export const subscribeToNetworkChanges = (callback) => {
    return NetInfo.addEventListener(state => {
        callback(state.isConnected && state.isInternetReachable);
    });
};

// Custom hook for network status (for use with useEffect)
export const useNetworkStatus = () => {
    return {
        checkNetworkStatus,
        subscribeToNetworkChanges,
    };
};

// Clear all cached data
export const clearCache = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.POSTS);
        console.log('Cache cleared');
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
};
