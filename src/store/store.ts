import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
    cards: cardsReducer,
    auth: authReducer,
})

const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const store = setupStore()