import { Route, Routes } from "react-router-dom"

import "./scss/app.scss"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Cart from "./pages/Cart"
import MainLayout from "./layouts/MainLayout"
import SinglePizza from "./pages/SinglePizza"

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<MainLayout />}>
                <Route path={"pizza/:id"} element={<SinglePizza />} />
                <Route path={"/"} element={<Home />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path={"*"} element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
