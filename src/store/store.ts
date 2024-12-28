import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
    reducer: {
        cards: cardsReducer,
        users: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store };