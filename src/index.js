import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bulma/css/bulma.css";
import { configureStore } from '@reduxjs/toolkit'
import {paramsSlice} from './reducer';
import { Provider } from 'react-redux'

export const store = configureStore({
  reducer: paramsSlice.reducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
