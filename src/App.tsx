import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css/App.css';
import './css/components.css';
import lists from './data/lists';
import Main from './Main';

class App extends React.Component {
  public render() {

    const bindMain = () => (
      <Main title="Richard's Blog" lists={lists} />
    )

    return (
      <div className="app">
        <Router>
          <Route path="/" render={bindMain} />
        </Router>
      </div>
    );
  }
}

export default App;
