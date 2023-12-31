// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Global Styles
import './index.css'

// Components
import Header from './components/header'
import Sidebar from './components/sidebar'
import PagesWrapper from './components/pagesWrapper'

// Pages
import ErrorPage from './pages/error'
import HomePage from './pages/home'
import ProfilePage from './pages/profile'
import SettingsPage from './pages/settings'
import CommunityPage from './pages/community'

// Providers
import { AppProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <Sidebar />
                <Header />
                <PagesWrapper>
                    <Routes>
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profile/:id" element={<ProfilePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/community" element={<CommunityPage />} />
                    </Routes>
                </PagesWrapper>
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>
)
