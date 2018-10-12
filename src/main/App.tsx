import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import i18n from '../i18n';
import { reducers } from '../reducers';
import { ReduxDispatch, State } from '../types';
import Banner from './layouts/Banner';
import Contents from './layouts/Contents';
import Footer from './layouts/Footer';
import Lists from './layouts/Lists';
import Navigation from './layouts/Navigation';


// combine interface
interface Props extends ReduxDispatch, State {}


class App extends React.Component<Props> {

  public render() {

    const { contents, lists, dispatch } = this.props;

    // for pass props
    const ListsWrapper = () => (
      <Lists {...lists} dispatch={dispatch} />
    )
    const ContentsWrapper = (props: RouteComponentProps<any>) => (
      <Contents article={props.match.params.article} {...contents} />
    )

    return (
      <Router>
        <div className="app">
          <Navigation />
          <Route path="/" exact={true} component={Banner} />
          <Route path="/" exact={true} component={ListsWrapper} />
          <Route path="/articles/:article" component={ContentsWrapper} />
          <Footer />
        </div>
      </Router>
    );
  }
}

// map attribute from store
const mapStateTpProps = (state: State) => {
  return {
    contents: state.contents,
    lists: state.lists
  }
};

// create container component
const AppContainer = connect(
  mapStateTpProps
)(App);

// integrate with redux
// create store
const store = createStore(reducers, applyMiddleware(thunk));
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
