import * as React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../../components';
import { Translate } from '../../types';


class Navigation extends React.Component {

  public state = {
    showLogo: false
  }

  /**
   * The constructor.
   */
  public constructor(props: Translate) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  /**
   * Checker for check if current path is the home page.
   */
  public isHomePage() {
    return window.location.pathname === '/';
  }

  /**
   * Handler for check scroll position,
   * and control the logo to show or hide on navigation.
   */
  public handleScroll() {

    // do nothing if current page is not the home page
    if (!this.isHomePage()) {
      return;
    }

    // the control flag of logo
    const s = this.state.showLogo;

    // check condition
    // show logo when scroll over the first screen
    const checkScrollPosition = window.pageYOffset > window.innerHeight;

    // display logo when first screen was passed and logo was not displayed
    // and hide logo when not
    if (checkScrollPosition && !s) {
      this.setState({ showLogo: true });
    } else if (!checkScrollPosition && s) {
      this.setState({ showLogo: false });
    }
  }

  /**
   * Load event listener.
   */
  public componentDidMount() {
    // bind listener to scroll events
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * Unload event listener.
   */
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
