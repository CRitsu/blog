import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import './css/App.css';
import './css/components.css';
import { en, zh } from './languages';
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

// add i18n support
addLocaleData([en, zh])
// wrap i18n provider
const I18nAppProvider = () => (
  <IntlProvider locale="zh">
    <AppProvider />
  </IntlProvider>
)

export default I18nAppProvider;
