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
import OrganisationForm from "./pages/OrganisationRegister.jsx";
import VolunteerForm from './pages/VolunteerRegister.jsx'
import ProtectedRoute from "./ProtectedRoute.jsx";
// import {ErrorPage} from "./errorPage";
import LoginForm from "./pages/Login.jsx";

const App = () => {

    return (
        <Box sx={{display:"flex", flexDirection:"column",minHeight:"100vh", gap: 7}}>
            <Navbar/>
            <MainLayout>
                <Routes>
                    <Route path="/register" element={<RegisterChoiceForms />} />
                    <Route path="/register/volunteer" element={<VolunteerForm />} />
                    <Route path="/register/organizer" element={<OrganisationForm />} />
                    <ProtectedRoute>
                        <Route element={<MainLayout />}>
                            <Route path="/volunteer/tasks" element={<TasksList />} />
                            <Route path="/volunteer/my-tasks" element={<MyTasks />} />
                            <Route path="/volunteer/rewards" element={<Rewards />} />
                            <Route path="/organizer/tasks" element={<MyPostedTasks />} />
                            <Route path="/organizer/create" element={<CreateTask />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </ProtectedRoute>
                    <Route path ='/register' element={<RegisterChoiceForms />}/>
                    <Route path ='/login' element={<LoginForm />}/>
                </Routes>
            </MainLayout>
            <Footer/>
        </Box>
    )
}

export default App