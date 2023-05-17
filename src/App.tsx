import { Route, Routes } from "react-router-dom";
import Public from "./pages/Public";
import RequireAuth from "./pages/RequireAuth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";

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
                    </Route>
                </Route>
            </Routes>
        </main>
    );
}

export default App;
