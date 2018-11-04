import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import i18n from '../i18n';
import { reducers } from '../reducers';
import { HiddenState, ReduxDispatch, State } from '../types';
import Banner from './layouts/Banner';
import Contents from './layouts/Contents';
import Footer from './layouts/Footer';
import Lists from './layouts/Lists';
import Navigation from './layouts/Navigation';


// combine interface
interface Props extends ReduxDispatch, State { }


class App extends React.Component<Props> {

  public render() {

    const { common, contents, lists, dispatch } = this.props;

    // for pass props

    const BannerWrapper = () => (
      <Banner {...common} dispatch={dispatch} />
    )

    const ListsWrapper = () => (
      <Lists {...lists} {...common} dispatch={dispatch} />
    )
    const ContentsWrapper = (props: RouteComponentProps<any>) => (
      <Contents aid={props.match.params.article} {...contents} dispatch={dispatch} />
    )

    return (
      <Router>
        <div className="app">
          <Navigation />
          <Route path="/:path(|list/tech|list/memo|list/photo|list/talk|list/tags)" exact={true} render={BannerWrapper} />
          <Route path="/:path(|list/tech|list/memo|list/photo|list/talk|list/tags)" exact={true} render={ListsWrapper} />
          <Route path="/articles/:article" render={ContentsWrapper} />
          <Footer />
        </div>
      </Router>
    );
  }
}

// map attribute from store
const mapStateTpProps = (state: State & HiddenState) => {

  const l = state.listCollection[state.lists.category];

  return {
    common: { ...state.common },
    contents: { ...state.contents },
    lists: {
      ...state.lists,
      list: l ? l : []
    },
  }
};

// create container component
const AppContainer = connect(
  mapStateTpProps
)(App);

// wrapper
const AppWrapper = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <AppContainer />
    </Provider>
  </I18nextProvider>
)

export default AppWrapper;
