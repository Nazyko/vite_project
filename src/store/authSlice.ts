import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Интерфейсы данных
export interface IUser {
    id: number;
    username: string;
    accessToken: string;
    refreshToken: string;
}

export interface AuthRequest {
    username: string;
    password: string;
}

interface AuthState {
    id: number | null;
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

// Изначальное состояние
const initialState: AuthState = {
    id: null,
    username: null,
    accessToken: localStorage.getItem('token') || null,
    refreshToken: null,
    loading: false,
    error: null,
};

// Асинхронное действие для авторизации
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: AuthRequest, thunkAPI) => {
        try {
            const response = await axios.post<IUser>('https://dummyjson.com/auth/login', credentials);
            return response.data; // данные пользователя и токен
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message || 'Invalid credentials');
            }
            return thunkAPI.rejectWithValue('Network Error');
        }
    }
);

// Слайс авторизации
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Действие для выхода из системы
        logout(state) {
            state.username = null;
            state.accessToken = null;
            localStorage.removeItem('token'); // Удаление токена из localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.username = action.payload.username;
                state.accessToken = action.payload.accessToken;
                localStorage.setItem('token', action.payload.accessToken); // Сохранение токена
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Экспорт действий и редьюсера
export const { logout } = authSlice.actions;
export default authSlice.reducer;