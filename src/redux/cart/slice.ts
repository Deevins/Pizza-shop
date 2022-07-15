import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPizza } from "../../@types/IPizza"
import { getCartFromLS } from "utils/getCartFromLS"
import { ICartSliceState } from "./types"

const findSelectedItem = (
    state: ICartSliceState,
    action: { payload: any; type?: string }
) =>
    state.items.find(
        (obj) =>
            obj.id === action.payload.id &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size
    )

const initialState: ICartSliceState = {
    items: getCartFromLS().items,
    totalPrice: getCartFromLS().totalPrice,
    totalItems: getCartFromLS().items.length || 0
}

export const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<IPizza>) {
            const findItem = findSelectedItem(state, action)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalItems++
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        removeProduct(state, action: PayloadAction<IPizza>) {
            // TODO: fix problem with delete cart items. find a way to delete item with id and its own 'type' and 'size'
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            )
            state.totalItems = state.totalItems - action.payload.count
            state.totalPrice =
                state.totalPrice - action.payload.price * action.payload.count
        },
        clearCart(state) {
            state.items = []
            state.totalPrice = 0
            state.totalItems = 0
        },
        itemDecrement(state, action: PayloadAction<IPizza>) {
            const selectedItem = findSelectedItem(state, action)
            if (selectedItem) {
                selectedItem.count--
                state.totalItems--
                state.totalPrice = state.totalPrice - action.payload.price
            }
        }
    }
})

export const { addProduct, removeProduct, clearCart, itemDecrement } =
    slice.actions

export default slice.reducer
