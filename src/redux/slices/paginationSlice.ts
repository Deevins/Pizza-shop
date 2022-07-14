import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"

interface IPaginationSliceState {
    currentPage: number
    pageCount: number
}

const initialState: IPaginationSliceState = {
    currentPage: 1,
    pageCount: 1
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = Number(action.payload)
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        }
    }
})

export const selectPagination = (state: RootState) => state.pagination

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPageCount } = paginationSlice.actions

export default paginationSlice.reducer
