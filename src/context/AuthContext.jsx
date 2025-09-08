// --- START OF FILE frontend/src/context/AuthContext.jsx ---
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // No longer decoding token on client

const AuthContext = createContext(null);

export const API_BASE_URL = 'http://localhost:5000/api';

// Axios instance for API calls.
// The browser will automatically send the HttpOnly cookie with requests to the same domain.
// For cross-origin requests, `withCredentials: true` is needed on client & CORS setup on server.
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // <--- IMPORTANT: Send cookies with requests
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // For initial auth check

    const fetchUser = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("/auth/me"); // This endpoint is protected
            setUser(response.data);
        } catch (error) {
            // console.error("Not authenticated or error fetching user:", error.response?.data?.message || error.message);
            setUser(null); // Ensure user is null if fetch fails (e.g., 401)
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser(); // Fetch user on initial load to check for existing session via cookie
    }, [fetchUser]);

    // Login is now implicit: Google redirects, backend sets cookie, frontend fetches user.
    // This function can be called after OAuth success to trigger a user fetch.
    const afterLoginSuccess = useCallback(() => {
        fetchUser();
    }, [fetchUser]);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            await apiClient.post("/auth/logout"); // Call backend logout
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            // Even if backend call fails, clear user state on client
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        fetchUser, // Expose fetchUser if needed elsewhere
        afterLoginSuccess, // Expose this to trigger user refresh after oauth
        apiClient // Expose apiClient
    }), [user, loading, logout, fetchUser, afterLoginSuccess]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);