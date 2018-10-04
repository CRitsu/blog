import { changeLanguage } from 'i18next';
import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Block } from '../../components';
import { name } from '../../config';
import { Translate } from '../../types';


class Navigation extends React.Component<Translate> {

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

  public handleChangeLanguage(e: React.MouseEvent) {
    const current = e.currentTarget;
    const value = current.getAttribute('value');
    if (value !== null) {
      changeLanguage(value);
    }
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

    const { t } = this.props;

    const { showLogo } = this.state;
    const homeClass = !this.isHomePage() || showLogo ? 'home w' : 'home';


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
          <Block className="" />
        </div>

        <div className={homeClass}>
          <Link to="/" className="logo-link" onClick={scrollToTop} title={name} />
        </div>

        <div className={blockClasses}>
          <Block />
          <Block />
          <Block />
          <div className="menu">
            <div className="item language">
              <div className="name">{t('language')}</div>
              <ul className="language-list">
                <li className="l" onClick={this.handleChangeLanguage} value="EN">ENGLISH</li>
                <li className="l" onClick={this.handleChangeLanguage} value="ZH">中文</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default translate()(Navigation);
