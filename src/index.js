import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from "@material-ui/core/styles";
import  { baseTheme } from 'utils/theme.js';
import {store} from 'utils/redux/store';
import {Provider} from 'react-redux';

ReactDOM.render(
 
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={baseTheme}>
        <Routes />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
