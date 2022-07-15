import { RootState } from "../store"
import { IPizza } from "../../@types/IPizza"

export const selectCart = (state: RootState) => state.cart
export const selectItemFromCartByProps =
    (id: string, type: number, size: number) => (state: RootState) =>
        state.cart.items.find(
            (obj: IPizza) =>
                obj.id === id && obj.type === type && obj.size === size
        )
