import * as React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../components';
import { Translate } from '../types';


class Navigation extends React.Component {

  public state = {
    showLogo: false
  }

  public constructor(props: Translate) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  public isHomePage() {
    return window.location.pathname === '/';
  }

  public handleScroll() {

    // do nothing if current page is not the home page
    if (!this.isHomePage()) {
      return;
    }

    const s = this.state.showLogo;

    // check condition
    const checkScrollPosition = window.pageYOffset > window.innerHeight;

    // change home only when needed
    if (checkScrollPosition && !s) {
        this.setState({ showLogo: true });
    } else if (!checkScrollPosition && s) {
      this.setState({ showLogo: false });
    }
  }

  public componentDidMount() {
    // bind listener to scroll events
    window.addEventListener('scroll', this.handleScroll);
  }

  public componentWillUnmount() {
    // remove listener when unmount
    window.removeEventListener('scroll', this.handleScroll);
  }

  public render() {

    const { showLogo } = this.state;
    const homeClass = !this.isHomePage() || showLogo ? 'home w' : 'home';

    const blocksBackgroundColor = 'bg-blue-light1';

    // check if the user agent is windows platform
    // scroll bar display in different way between mac and windows
    // to make window platform display in the same way with mac
    // add a 'margin-right' to fixes scroll bar's width
    const isWindows = navigator.userAgent.indexOf('Windows') !== -1;
    const blockClasses = isWindows ? 'blocks fix-right' : 'blocks';

    const scrollToTop = () => window.scrollTo(0, 0);

    return (
      <div className="nav">

        <div className="index">
          <Block className={blocksBackgroundColor} />
        </div>

        <div className={homeClass}>
          <Link to="/" className="logo-link" onClick={scrollToTop} />
        </div>

        <div className={blockClasses}>
          <Block className={blocksBackgroundColor} />
          <Block className={blocksBackgroundColor} />
          <Block className={blocksBackgroundColor} />
        </div>

      </div>
    )
  }
}

export default Navigation;
