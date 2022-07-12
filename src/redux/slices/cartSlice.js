import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalPrice: 0,
    totalItems: 0
}

const findSelectedItem = (state, action) =>
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
        addProduct(state, action) {
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
        removeProduct(state, action) {
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
        itemDecrement(state, action) {
            const selectedItem = findSelectedItem(state, action)
            if (selectedItem.count === 1) {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload.id
                )
                state.totalItems = state.totalItems - 1
                state.totalPrice = state.totalPrice - action.payload.price
            } else {
                selectedItem.count--
                state.totalItems--
                state.totalPrice = state.totalPrice - action.payload.price
            }
        }
    }
})

export const selectCart = (state) => state.cart
export const selectItemFromCartByProps = (id, type, size) => (state) =>
    state.cart.items.find(
        (obj) => obj.id === id && obj.type === type && obj.size === size
    )

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearCart, itemDecrement } =
    cartSlice.actions

export default cartSlice.reducer
