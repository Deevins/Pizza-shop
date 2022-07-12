import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ITEMS_FETCH_URL } from "../../assets/constants"
import { PENDING, REJECTED, SUCCESS } from "../../assets/fetchStatus"

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzaStatus",
    async (params) => {
        const { currentPage, categoryAttrs, sortAttrs, searchAttrs } = params

        const response = await axios.get(
            `${ITEMS_FETCH_URL}?page=${currentPage}&limit=4&${categoryAttrs}${sortAttrs}${searchAttrs}`
        )
        return response.data
    }
)

const initialState = {
    items: [],
    status: PENDING // loading | success | failure
}

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload
        }
    },
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         console.log("Запрос отправляется...")
    //         state.items = []
    //     },
    //     [fetchPizzas.rejected]: (state) => {
    //         console.log("Запрос отклонен...")
    //         state.items = []
    //         state.status = REJECTED
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         console.log("Запрос выполнен успешно...")
    //         state.items = action.payload
    //         state.status = SUCCESS
    //     }
    // }
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        // eslint-disable-next-line no-unused-expressions
        builder.addCase(fetchPizzas.pending, (state) => {
            console.log("Запрос отправляется...")
            state.status = PENDING
            state.items = []
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            console.log("Запрос отклонен...")
            state.items = []
            state.status = REJECTED
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            console.log("Запрос выполнен успешно...")
            state.items = action.payload
            state.status = SUCCESS
        })
    }
})

export const selectPizzas = (state) => state.pizza

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer
