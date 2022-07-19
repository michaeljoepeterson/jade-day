import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Navbar } from './components/navbar';
const HomePage = React.lazy(() => import('./pages/home-page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found'));

function App() {
  return (
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
  );
}

export default App;
