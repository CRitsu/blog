import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import Contents from './Contents';
import i18n from './i18n';
import Lists from './Lists';
import { rootReducer as reducers } from './reducers';
import { Articles, State } from './type';

interface Props {
  lists: Articles[]
}

interface AppState {
  windowWidth: number
}


class App extends React.Component<Props, AppState> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    };
  }

  public handleResize() {
    this.setState({windowWidth: window.innerWidth})
  }

  public componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  public render() {

    let listsWidth: number;
    let contentWidth: number;
    const { windowWidth } = this.state;

    if (windowWidth < 1298){
      listsWidth = windowWidth;
      contentWidth = windowWidth;
    } else {
      listsWidth = windowWidth * 0.3819;
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
