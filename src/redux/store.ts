import { configureStore } from "@reduxjs/toolkit"

import filter from "./slices/filterSlice"
import pagination from "./slices/paginationSlice"
import cart from "./slices/cartSlice"
import pizza from "./slices/pizzaSlice"
import { useDispatch } from "react-redux"

export const store = configureStore({
    reducer: {
        filter,
        pagination,
        cart,
        pizza
    }
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
