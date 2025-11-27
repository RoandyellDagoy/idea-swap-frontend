import { createBrowserRouter  } from "react-router-dom";
import App from "../src/App";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";
import LoginDashboard from "../src/pages/LoginDashboard"
import ProtectedRoute from "./ProtectedRoute"
import { Dashboard } from "../src/pages/Dashboard";
import AuthCallBack from "../routes/AuthCallBack"
import { IdeasProvider } from "../src/context/IdeasContext";

export const router = createBrowserRouter ([
    {path: "/", element: <App />},
    {path: "/signin", element: <SignIn />},
    {path: "/signup", element: <SignUp />},
    {path: "/auth/callback", element: <AuthCallBack />},
    {path: "/logindashboard", element: <LoginDashboard/>},
    {
        path: "/dashboard", element: (
            <ProtectedRoute>
                <IdeasProvider>
                    <Dashboard />
                </IdeasProvider>
            </ProtectedRoute>
        )
    }
])