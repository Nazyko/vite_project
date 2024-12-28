import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { UsersProps } from "../types/type";

interface UsersData {
    limit: number;
    total: number;
    skip: number;
    users: UsersProps[];
}

export const getUsers = createAsyncThunk<UsersData, void, { rejectValue: string }>(
    'users/getUsers',
    async function (_, { rejectWithValue }) {
        const response = await fetch('https://dummyjson.com/users', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        });

        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }

        const data: UsersData = await response.json();
        return data;
    }
);

interface UserState {
    usersList: UsersProps[];
    loading: boolean;
    error: null | string;
}

const initialState: UserState = {
    usersList: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<UsersData>) => {
                state.loading = false;
                state.usersList = action.payload.users;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;

function isError(action: AnyAction): action is PayloadAction<string> {
    return action.type.endsWith('rejected') && typeof action.payload === 'string';
}
