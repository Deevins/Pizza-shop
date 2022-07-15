import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IPaginationSliceState } from "./types"

const initialState: IPaginationSliceState = {
    currentPage: 1,
    pageCount: 1
}

export const slice = createSlice({
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

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPageCount } = slice.actions

export default slice.reducer
