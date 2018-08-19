import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import './css/App.css';
import './css/components.css';
import i18n from './i18n';
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

// create container component
const AppContainer = connect(
  mapStateTpProps, {}
)(App);

// integrate redux
// create store
const store = createStore(reducers);
// wrap redux context
const AppProvider = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

// wrap i18n provider
const I18nextAppProvider = () => (
  <I18nextProvider i18n={i18n}>
    <AppProvider />
  </I18nextProvider>
)

export default I18nextAppProvider;
