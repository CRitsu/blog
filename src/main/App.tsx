import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, Dispatch } from 'redux';
import { fetchLists } from '../fetch';
import i18n from '../i18n';
import { rootReducer as reducers } from '../reducers';
import { Articles, State } from '../types';
import Banner from './layouts/Banner';
import Contents from './layouts/Contents';
import Lists from './layouts/Lists';
import Navigation from './layouts/Navigation';

interface Props {
  lists: Articles[],
  dispatch: Dispatch
}

class App extends React.Component<Props> {
  
  public componentDidMount() {
    // fetch lists when loading is completed
    fetchLists(this.props.dispatch);
  }

  public render() {

    // for pass props
    const ListsWrapper = () => (
      <Lists lists={this.props.lists} />
    )

    return (
      <Router>
        <div className="app">
          <Navigation />
          <Route path="/" exact={true} component={Banner} />
          <Route path="/" exact={true} component={ListsWrapper} />
          <Contents />
        </div>
      </Router>
    );
  }
}

// map attribute from store
const mapStateTpProps = (state: State) => {
  return {
    lists: state.lists
  }
};

// create container component
const AppContainer = connect(
  mapStateTpProps
)(App);

// integrate with redux
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
