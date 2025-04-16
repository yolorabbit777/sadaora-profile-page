import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import FeedPage from "./pages/FeedPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./components/layout/MainLayout";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-100">
                    <MainLayout>
                        <main className="container mx-auto px-4 py-8">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                {/* Protected Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/profile/edit" element={<EditProfilePage />} />
                                    <Route path="/feed" element={<FeedPage />} />
                                    <Route path="/profile/me" element={<ProfilePage />} />
                                    <Route path="/profile/:userId" element={<ProfilePage />} />
                                </Route>

                                {/* Default Route */}
                                <Route path="/" element={<Navigate to="/feed" replace />} />

                                {/* 404 Route */}
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </main>
                    </MainLayout>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
