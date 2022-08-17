import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Navbar } from './components/navbar';
import { listenForAuth } from './auth/auth';
import { useAppDispatch } from './store';
import { AuthProvider } from './auth/auth.context';
const HomePage = React.lazy(() => import('./pages/home-page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found'));


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    listenForAuth(dispatch);
  }, [])
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <div className="page">
          <Routes>
              <Route path="/" element={
                <Suspense fallback={<></>}>
                  <HomePage/>
                </Suspense>
              }/>
              <Route path="*" element={
                <Suspense fallback={<></>}>
                  <NotFoundPage/>
                </Suspense>
              }/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;