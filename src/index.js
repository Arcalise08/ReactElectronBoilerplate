import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes";
import details from "./redux/store";
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import TigerProvider from "./components/TigerProvider";
import { PersistGate } from 'redux-persist/integration/react'

const store = details();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store.store}>
          <PersistGate loading={null} persistor={store.persistor}>
              <TigerProvider>
                  <Routes />
              </TigerProvider>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
