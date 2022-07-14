import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { ITEMS_FETCH_URL } from "../../assets/constants"
import { FetchStatusEnum } from "../../@types/enums/FetchStatusEnum"
import { IPizza } from "../../@types/IPizza"
import { RootState } from "../store"

interface IPizzaSliceState {
    items: IPizza[]
    status: FetchStatusEnum
}

type FetchPizzaArgs = {
    currentPage: number
    categoryAttrs: string
    sortAttrs: string
    searchAttrs: string
}

export const fetchPizzas = createAsyncThunk<IPizza[], FetchPizzaArgs>(
    "pizza/fetchPizzaStatus",
    async (params) => {
        const { currentPage, categoryAttrs, sortAttrs, searchAttrs } = params

        const { data } = await axios.get(
            `${ITEMS_FETCH_URL}?page=${currentPage}&limit=4&${categoryAttrs}${sortAttrs}${searchAttrs}`
        )
        return data
    }
)

const initialState: IPizzaSliceState = {
    items: [],
    status: FetchStatusEnum.PENDING
}

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<IPizza[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            console.log("Запрос отправляется...")
            state.status = FetchStatusEnum.PENDING
            state.items = []
        })
        builder.addCase(
            fetchPizzas.fulfilled,
            (state, action: PayloadAction<IPizza[]>) => {
                console.log("Запрос выполнен успешно...")
                state.items = action.payload
                state.status = FetchStatusEnum.SUCCESS
            }
        )
        builder.addCase(fetchPizzas.rejected, (state) => {
            console.log("Запрос отклонен...")
            state.items = []
            state.status = FetchStatusEnum.REJECTED
        })
    }
})

export const selectPizzas = (state: RootState) => state.pizza

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer
