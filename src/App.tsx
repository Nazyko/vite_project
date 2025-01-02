import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ProductsCartProvider } from './context/ProductsCartContext';
import CartPage from './pages/CartPage';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import SinglePage from './pages/SinglePage';
import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from './pages/PrivateRoute';

const App = () => {   
    return (
        <>
            <ProductsCartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route index element={<Home />}/>
                            <Route path='/:id' element={<SinglePage />}/>
                            <Route element={<PrivateRoute/>}>
                                <Route path='/cart' element={<CartPage />} />
                            </Route>
                            <Route path='/registration' element={<Register/>} />
                            <Route path='/login' element={<Login/>} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ProductsCartProvider>
        </>
    );
}

export default App;