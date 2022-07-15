import { RootState } from "../store"

export const selectFilters = (state: RootState) => state.filter
export const selectSortFilter = (state: RootState) => state.filter.sortType
