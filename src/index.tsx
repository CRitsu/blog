import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from '../node_modules/redux';
import App from './App';
import './css/index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(reducers);

const provider = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  provider,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
