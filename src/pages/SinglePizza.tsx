import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import { IPizza } from "../@types/IPizza"

const SinglePizza: React.FC = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState<IPizza>()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://62b371bba36f3a973d223580.mockapi.io/items/${id}`
                )
                setPizza(data)
            } catch (error) {
                console.log(error)
                alert(
                    "Ошибка при получении пиццы. Проверьте консоль для доп. информации."
                )
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <h1>Загрузка....</h1>
    }

    return (
        <>
            <img
                src={pizza.imageUrl}
                alt="pizza"
                style={{ width: "250px", height: "100%" }}
            />
            <div>
                <h2>{pizza.title}</h2>
                <p>от {pizza.price} ₽</p>
                <p>описание</p>
            </div>
        </>
    )
}

export default SinglePizza
