import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);  // Create the root for the React app
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
}
reportWebVitals();
