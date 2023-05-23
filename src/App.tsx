import { Route, Routes } from "react-router-dom";
import Public from "./pages/Public";
import RequireAuth from "./pages/RequireAuth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AssetPage from "./pages/AssetPage";
import PositionsPage from "./pages/PositionsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
    return (
        <main className="content">
            <Routes>
                <Route path="/" element={<Outlet />}>
                    {/* public routes */}
                    <Route index element={<Public />} />
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />

                    {/* protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route path="home" element={<HomePage />} />
                        <Route path={`/:symbol`} element={<AssetPage />} />
                        <Route path={`/positions`} element={<PositionsPage />} />
                        <Route path={`/activities`} element={<ActivitiesPage />} />
                        <Route path={`/orders`} element={<OrdersPage />} />
                    </Route>
                </Route>
            </Routes>
        </main>
    );
}

export default App;
