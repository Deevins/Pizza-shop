import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import filter from "./filter/slice"
import pagination from "./pagination/slice"
import cart from "./cart/slice"
import pizza from "./pizza/slice"

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
