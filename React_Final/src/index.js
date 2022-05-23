
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom'
import store from './redux/store';
import App from './App';
import { Provider } from "react-redux";


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  //<StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  //</StrictMode>,
);