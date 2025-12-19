import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, MOCK_USER } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const loggedIn = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
            if (loggedIn === 'true') {
                setIsLoggedIn(true);
                setUser(MOCK_USER);
            }
        } catch (error) {
            console.log('Error checking login status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
            setUser(MOCK_USER);
            setIsLoggedIn(true);
        } catch (error) {
            console.log('Error logging in:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
