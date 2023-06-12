import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { WorkoutsContextProvider } from './context/WorkOutsContext';
import AuthContextProvider from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
