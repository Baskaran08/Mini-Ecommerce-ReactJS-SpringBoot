import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Home from './Pages/User/Home.jsx'
import Category from './Pages/User/Category.jsx'
import ProductsPage from './Pages/User/ProductsPage.jsx'
import CartItems from './Pages/User/CartItems.jsx'
import Orders from './Pages/User/Orders.jsx'
import ProductManagement from './Pages/Admin/ProductManagement.jsx'
import AllOrders from './Pages/Admin/AllOrders.jsx'
import AdminDashBoard from './Pages/Admin/AdminDashBoard.jsx'
import UserLayout from './Pages/User/UserLayout.jsx'
import SearchResults from './Pages/User/SearchResults.jsx';
import AllUsers from './Pages/Admin/AllUsers.jsx';

function App() {

        return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route element={<UserLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/category/:productCategory" element={<Category />} />
                    <Route path="/product/:id" element={<ProductsPage />} />
                    <Route path="/cart" element={<CartItems />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path='/search' element={<SearchResults />} />
                </Route>
                <Route path='/admin'>
                    <Route path="dashboard" element={<AdminDashBoard/>} />
                    <Route path="products" element={<ProductManagement/>} />
                    <Route path="orders" element={<AllOrders/>} />
                    <Route path="users" element={<AllUsers/>} />
                </Route>
            </Routes>
            </BrowserRouter>
            <ToastContainer position="top-right" autoClose={3000}  theme="dark"/>
        </>
        )
}

export default App
