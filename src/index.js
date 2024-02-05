import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from "./redux/store";
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/es/integration/react";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistStore(Store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

