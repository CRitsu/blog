import * as React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../components';
import { Translate } from '../types';


class Navigation extends React.Component {

  public state = {
    home: '...'
  }

  public constructor(props: Translate) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }


  public handleScroll() {

    const h = this.state.home;
    const normal = '...';
    const logo = 'Richard zfanli';

    // check condition
    const checkScrollPosition = window.pageYOffset > window.innerHeight;
    const isNormal = h === normal;

    // change home only when needed
    if (checkScrollPosition && isNormal) {
        this.setState({ home: logo });
    } else if (!checkScrollPosition && !isNormal) {
      this.setState({ home: normal });
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

    const { home } = this.state;
    const homeClass = home === '...' ? 'home' : 'home w';

    const blocksBackgroundColor = 'bg-blue-light1';

    // check if the user agent is windows platform
    // scroll bar display in different way between mac and windows
    // to let different platform display in same way
    // add a 'margin-right' to fixes scroll bar's width
    const isWindows = navigator.userAgent.indexOf('Windows') !== -1;
    const blockClasses = isWindows ? 'blocks fix-right' : 'blocks'

    return (
      <div className="nav">

        <div className="index">
          <Block className={blocksBackgroundColor} />
        </div>

        <div className={homeClass}>
          <Link to="/">{home}</Link>
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
