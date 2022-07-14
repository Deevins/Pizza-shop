import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPizza } from "../../@types/IPizza"
import { RootState } from "../store"

interface ICartSliceState {
    items: IPizza[]
    totalPrice: number
    totalItems: number
}

const initialState: ICartSliceState = {
    items: [],
    totalPrice: 0,
    totalItems: 0
}

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

export const cartSlice = createSlice({
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
            if (selectedItem && selectedItem.count === 1) {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload.id
                )
                state.totalItems = state.totalItems - 1
                state.totalPrice = state.totalPrice - action.payload.price
            } else {
                if (selectedItem) {
                    selectedItem.count--
                    state.totalItems--
                    state.totalPrice = state.totalPrice - action.payload.price
                }
            }
        }
    }
})

export const selectCart = (state: RootState) => state.cart
export const selectItemFromCartByProps =
    (id: string, type: number, size: number) => (state: RootState) =>
        state.cart.items.find(
            (obj: IPizza) =>
                obj.id === id && obj.type === type && obj.size === size
        )

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearCart, itemDecrement } =
    cartSlice.actions

export default cartSlice.reducer
