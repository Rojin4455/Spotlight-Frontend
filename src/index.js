import React from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './store';
import { Toaster } from 'sonner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Toaster position="top-center"/>
    <App />
  </Provider>
);


