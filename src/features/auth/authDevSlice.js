import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authAPI';
import { STORAGE } from '../../config/storage/storageKeys';

const initialState = {
    user: STORAGE.getUser() || null,
    token: STORAGE.getToken() || null,
    isAuthenticated: !!STORAGE.getToken(),
    loading: false,
    error: null,
    tempRole: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            STORAGE.clearToken();
        },

        resetAuthError: (state) => {
            state.error = null;
        },

        // 🔥 DEV ONLY ROLE SWITCH
        forceRole: (state, action) => {
            const allowedRoles = [
                'PRIVATE_USER',
                'LICENSE_USER',
                'PLATFORM_ADMIN',
                'COMPANY_ADMIN',
                'COMPANY_EMPLOYEE',
            ];

            if (!allowedRoles.includes(action.payload)) {
                console.warn('Invalid role ignored:', action.payload);
                return;
            }

            state.user = state.user
                ? { ...state.user, role: action.payload }
                : {
                    id: 'dev-user',
                    name: 'Dev User',
                    role: action.payload,
                };

            state.isAuthenticated = true;
            state.token = state.token || 'dev-token';
        },
    },


    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, resetAuthError, forceRole } = authSlice.actions;
export default authSlice.reducer;