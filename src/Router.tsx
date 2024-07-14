import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

import Layout from "./layouts/Layout";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={
                        <Suspense fallback="">
                            <IndexPage />
                        </Suspense>
                    } />

                    <Route path='/favoritos' element={
                        <Suspense fallback="">
                            <FavoritesPage />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;