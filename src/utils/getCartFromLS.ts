import { calcTotalPrice } from "./calcTotalPrice"
import { IPizza } from "../@types/IPizza"

export const getCartFromLS = () => {
    const data = localStorage.getItem("cart")
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)

    return {
        items: items as IPizza[],
        totalPrice
    }
}
