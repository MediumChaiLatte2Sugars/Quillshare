

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.render(
<BrowserRouter>
<Auth0Provider
  domain="dev-2jggyfjpths0o6ur.us.auth0.com"
  clientId="kERHuWD6o8BOtyhWE2xSQCEPa9KPhnGq"
  authorizationParams={{
    redirect_uri: `${window.location.protocol}//${window.location.host}/feed`
  }}
  logoutUrl={`${window.location.protocol}//${window.location.host}/homepage`}
  cacheLocation="localstorage"
>
<App />
</Auth0Provider>
</BrowserRouter>


, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();