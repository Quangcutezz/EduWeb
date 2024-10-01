import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/themeContext.tsx';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/loadingContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/authContext.tsx';
import { HelmetProvider } from 'react-helmet-async';

const helmetContext = {};
ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <HelmetProvider context={helmetContext}>
         <NextUIProvider>
            <AuthProvider>
               <ThemeProvider>
                  <LoadingProvider>
                     <GoogleOAuthProvider clientId="256335771767-ut4jmn0g202kp7lrtkkp8cgn6dsr6tue.apps.googleusercontent.com">
                        <BrowserRouter>
                           <App />
                        </BrowserRouter>
                     </GoogleOAuthProvider>
                  </LoadingProvider>
               </ThemeProvider>
            </AuthProvider>
         </NextUIProvider>
      </HelmetProvider>
   </React.StrictMode>,
);
