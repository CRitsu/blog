import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/index.css';
import App from './main';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
