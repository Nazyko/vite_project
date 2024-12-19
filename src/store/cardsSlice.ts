import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { ProductData } from "../types/type";

interface URLResponse {
    limit: number;
    products: ProductData[]; 
    skip: number;
    total: number;
  }

const URL = 'https://dummyjson.com/products?';


export const fetchProducts = createAsyncThunk<URLResponse, { limit: number; skip: number}, { rejectValue: string }>(
    'cards/fetchProducts',
    async function ({ limit, skip}, { rejectWithValue }) {

        const response = await fetch(`${URL}`+ `limit=${limit}&skip=${skip}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })

        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }

        const data: URLResponse = await response.json();
        return data;
    }
);

export const searchProduct = createAsyncThunk<string, string, { rejectValue: string }>(
    'cards/searchProduct',
    async function (title, { rejectWithValue }) {
        const response = await fetch(`https://dummyjson.com/products/search?q=${title}`, {
            method: 'GET',
        });

        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }

        return title; 
    }
);

type ProductState = {
    list: ProductData[];
    filteredList: ProductData[];
    total: number;
    loading: boolean;
    error: string | null;
};

const initialState: ProductState = {
    list: [],
    filteredList: [],
    total: 0,
    loading: false,
    error: null,
};

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload.products;
                state.total = action.payload.total
                state.loading = false;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                const searchTerm = action.payload.toLowerCase();
                state.filteredList = state.list.filter((product) =>
                    product.title.toLowerCase().includes(searchTerm)
                );
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default cardSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}
