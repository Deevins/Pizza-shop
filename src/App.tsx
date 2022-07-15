import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import "scss/app.scss"
import Home from "pages/Home"
import NotFound from "pages/NotFound"
import MainLayout from "./layouts/MainLayout"

const Cart = React.lazy(
    () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
)

const SinglePizza = React.lazy(
    () => import(/* webpackChunkName: "SinglePizza" */ "./pages/SinglePizza")
)

const App: React.FC = () => {
    return (
        <Suspense fallback={<h1>Загрузка...</h1>}>
            <Routes>
                <Route path={"/"} element={<MainLayout />}>
                    <Route path={"pizza/:id"} element={<SinglePizza />} />
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/cart"} element={<Cart />} />
                    <Route path={"*"} element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default App
