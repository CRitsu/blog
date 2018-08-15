import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import './css/App.css';
import './css/components.css';
import Main from './Main';
import { rootReducer as reducers } from './reducers';
import { Articles, State } from './type';

interface Props {
  lists: Articles[]
}

class App extends React.Component<Props, object> {
  public render() {

    const bindMain = () => (
      <Main title="Richard's Blog" lists={this.props.lists} />
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

const mapStateTpProps = (state: State) => {
  return {
    lists: state.lists
  }
};

const AppContainer = connect(
  mapStateTpProps, {}
)(App);

const store = createStore(reducers);

const AppProvider = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

export default AppProvider;
