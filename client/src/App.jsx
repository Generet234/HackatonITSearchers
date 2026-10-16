// import {HomePage} from "./homepage";
// import Navbar from "./navbar";
import {MainLayout} from "./templates/index.js";
import {Route, Routes} from "react-router-dom";
// import {CategoryPage} from "./categoryPage";
// import {ProductDetailPage} from "./productdetailpage";
// import {Footer} from "./footer/index.js";
import Box from "@mui/material/Box";
// import CartPage from "./cart/CartPage.jsx";
import RegisterChoiceForms from "./pages/RegisterChoice.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
// import {ErrorPage} from "./errorPage";
import LoginForm from "./pages/Login.jsx";

const App = () => {

    return (
        <Box sx={{display:"flex", flexDirection:"column",minHeight:"100vh", gap: 7}}>
            <Navbar/>
            <MainLayout>
                <Routes>
                    {/*<Route path ='/' element={*/}
                    {/*    <ProtectedRoute>*/}
                    {/*        <HomePage/>*/}
                    {/*    </ProtectedRoute> } />*/}
                    {/*<Route path ='/errorpage' element={<ErrorPage/>} />*/}
                    {/*<Route path ='/homepage' element={*/}
                    {/*    <ProtectedRoute>*/}
                    {/*        <HomePage/>*/}
                    {/*    </ProtectedRoute>} />*/}
                    {/*<Route path ='/shop' element={*/}
                    {/*    <ProtectedRoute>*/}
                    {/*        <CategoryPage />*/}
                    {/*    </ProtectedRoute>} />*/}
                    {/*<Route path ='/shop/:categoryName' element={*/}
                    {/*    <ProtectedRoute>*/}
                    {/*        <CategoryPage />*/}
                    {/*    </ProtectedRoute>} />*/}
                    {/*<Route path ='/details/:productId' element={*/}
                    {/*    <ProtectedRoute>*/}
                    {/*        <ProductDetailPage />*/}
                    {/*    </ProtectedRoute>}/>*/}
                    {/*<Route path ='/cart' element={*/}
                    {/*    <ProtectedRoute>*/}
                    {/*        <CartPage />*/}
                    {/*    </ProtectedRoute>}/>*/}
                    <Route path ='/register' element={<RegisterChoiceForms />}/>
                    <Route path ='/login' element={<LoginForm />}/>
                </Routes>
            </MainLayout>
            <Footer/>
        </Box>
    )
}

export default App