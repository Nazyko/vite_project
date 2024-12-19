import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import SinglePage from './pages/SinglePage';
import { fetchProducts } from './store/cardsSlice';
import { useAppDispatch } from './store/hook';

const App = () => {    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />}/>
                        <Route path='/:id' element={<SinglePage />}/>
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;