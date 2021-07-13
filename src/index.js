import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes";
import store from "./redux/store";
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import TigerProvider from "./components/TigerProvider";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <TigerProvider>
              <Routes />
          </TigerProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
