import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './components/navbar';
import { AuthProvider } from './contexts/auth.context';
import MemoriesPage from './pages/memories-page';
import CreateMemoryPage from './pages/create-memory-page';
import MainLayout from './components/main-layout';
import { NotificationProvider } from './contexts/notification.context';
const HomePage = React.lazy(() => import('./pages/home-page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found'));


function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Navbar/>
          <div className="page">
            <Routes>
                <Route path="/" element={
                  <Suspense fallback={<></>}>
                    <HomePage/>
                  </Suspense>
                }/>
                <Route path="memories" element={
                  <Suspense fallback={<></>}>
                    <MainLayout/>
                  </Suspense>
                }>
                  <Route path="" element={
                  <Suspense fallback={<></>}>
                    <MemoriesPage/>
                  </Suspense>
                  }/>
                  <Route path="create" element={
                  <Suspense fallback={<></>}>
                    <CreateMemoryPage/>
                  </Suspense>
                  }/>
                </Route>
                <Route path="*" element={
                  <Suspense fallback={<></>}>
                    <NotFoundPage/>
                  </Suspense>
                }/>
            </Routes>
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
