import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, Dispatch } from 'redux';
import { fetchLists } from './api';
import { size } from './constants';
import Contents from './Contents';
import i18n from './i18n';
import Lists from './Lists';
import { rootReducer as reducers } from './reducers';
import { Articles, State } from './type';

interface Props {
  lists: Articles[],
  dispatch: Dispatch
}

interface AppState {
  windowWidth: number
}

class App extends React.Component<Props, AppState> {

  public state = {
    windowWidth: window.innerWidth
  }

  public handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }
  
  public componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    // fetch lists when loading is completed
    fetchLists(this.props.dispatch);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  public render() {

    // store window width in state and handle resize
    const { windowWidth } = this.state;
    
    // calculate width for lists and contents
    let listsWidth: number;
    let contentWidth: number;
    // min width for two columns
    if (windowWidth < size.MIN_WIDTH) {
      listsWidth = windowWidth;
      contentWidth = windowWidth;
    } else {
      listsWidth = windowWidth * 0.3819;
      // ensure max width
      listsWidth = listsWidth > size.LIST_MAX_WIDTH ? size.LIST_MAX_WIDTH : listsWidth;
      contentWidth = windowWidth - listsWidth;
    }

    return (
      <Router>
        <div className="app">
          <Lists lists={this.props.lists} width={listsWidth} />
          <Contents width={contentWidth} />
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
