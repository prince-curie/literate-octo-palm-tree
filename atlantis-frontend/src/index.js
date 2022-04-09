import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CustomersAddressProvider from './components/contexts/CustomersAddressProvider';
import EtherProvider from './components/contexts/EtherProvider';
import HandleConnection from './components/contexts/HandleConnection';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <EtherProvider>
    <CustomersAddressProvider>
      <HandleConnection>
    <App />
    </HandleConnection>
    </CustomersAddressProvider>
    </EtherProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
