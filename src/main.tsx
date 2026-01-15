import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client'
import App from '@app/App';
import './index.css'


import './assets/css/tabler.min.css';
import './assets/css/tabler-flags.min.css';
import './assets/css/tabler-socials.min.css';
import './assets/css/tabler-payments.min.css';
import './assets/css/tabler-vendors.min.css';
import './assets/css/tabler-marketing.min.css';
import './assets/css/tabler-themes.min.css';

import './assets/js/tabler.min.js'
import './assets/js/tabler-theme.min.js'

import { Provider } from 'react-redux';
import { store } from './store';



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
