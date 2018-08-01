import * as React from 'react';
import './css/App.css';
import './css/components.css';
import lists from './data/lists';
import Main from './Main';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <Main title="Richard's Blog" lists={lists} />
      </div>
    );
  }
}

export default App;
