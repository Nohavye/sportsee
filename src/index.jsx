// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Global Styles
import './index.css'

// Components
import Header from './components/header'
import PageWrapper from './components/pageWrapper'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <PageWrapper>
                <Routes></Routes>
            </PageWrapper>
        </BrowserRouter>
    </React.StrictMode>
)
