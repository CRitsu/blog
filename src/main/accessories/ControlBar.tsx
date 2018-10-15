import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Translate } from '../../types';


interface Props extends Translate {
  top: number
}

interface State {
  bar: React.RefObject<HTMLDivElement>,
  cls: string
  input: React.RefObject<HTMLInputElement>,
}


/**
 * Control bar for switch tabs and search.
 * @param props activeTab and t translate function
 */
class ControlBar extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);

    this.state = {
      bar: React.createRef<HTMLDivElement>(),
      cls: '',
      input: React.createRef<HTMLInputElement>(),
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleOnfocus = this.handleOnfocus.bind(this);
    this.handleOnblur = this.handleOnblur.bind(this);
  }

  /**
   * Get target element offsetTop.
   * @param refObject ref object
   */
  public getOffsetTop(refObject: React.RefObject<HTMLDivElement>) {
    const current = refObject.current;
    if (current !== null) {
      // get offset top
      // 45 for navigation height
      return current.offsetTop - 45;
    }
    return 0;
  }

  /**
   * Calculate current position if it should change position.
   */
  public getClassNames() {
    const { cls, bar } = this.state;

    // when current scroll position is over the bar
    if (this.getOffsetTop(bar) < window.pageYOffset) {
      // set class name only when current class name is not 'hold'
      if (cls === '') {
        return 'hold';
      }
    } else {
      // reset class name only when it is not ''
      if (cls === 'hold') {
        return '';
      }
    }

    return undefined;
  }

  /**
   * Handler for scroll event.
   * 
   * Set position when scroll over the control bar.
   */
  public handleScroll() {
    const cls = this.getClassNames();
    if (cls !== undefined) {
      this.setState({ cls });
    }
  }

  public handleSwitchTabs(tab: number) {
    // this.setState()
  }

  /**
   * Add focus class name for input element.
   */
  public handleOnfocus() {
    const current = this.state.input.current;
    if (current !== null) {
      current.className = 'search focus';
    }
  }

  /**
   * Remove focus class name for input element.
   */
  public handleOnblur() {
    const current = this.state.input.current;
    if (current !== null) {
      current.className = 'search';
    }
  }

  /**
   * Load event listener.
   */
  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // fix position when switch active tab
    const cls = this.getClassNames();
    if (cls !== undefined) {
      this.setState({ cls });
    }
  }

  /**
   * Unload event listener.
   */
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  public render() {
    const { top, t } = this.props;
    const { bar, cls, input } = this.state;

    // edit class name
    const className = 'real-bar ' + cls;

    const getCategoryMenuClassName = () => {
      const path = window.location.pathname;
      const test = /\/list\/(tech|memo|photo|talk)/;
      if (test.test(path)) {
        return 'active'
      }
      return ''
    }

    const categories = ['tech', 'memo', 'photo', 'talk'];

    const scroll = () => window.scrollTo(0, top);

    return (
      <div className="control-bar" ref={bar}>
        <div className={className}>
          <div className="tabs">
            <NavLink to="/" exact={true} className="tab" activeClassName="active" onClick={scroll} >{t('latest')}</NavLink>
            <NavLink to="/list/tech" className={`tab ${getCategoryMenuClassName()}`} onClick={scroll} >{t('categories')}</NavLink>
            <NavLink to="/list/tags" className="tab" activeClassName="active" onClick={scroll} >{t('tags')}</NavLink>
          </div>
          <div className="search-area">
            <label className="magnifier">
              <span className="query-mark" />
              <input className="search" placeholder={t('search')} ref={input}
                onFocus={this.handleOnfocus} onBlur={this.handleOnblur} />
            </label>
          </div>
          <div className={`categories-menu-wrapper ${getCategoryMenuClassName()}`}>
            <div className="categories-menu">
              {categories.map(cat => (
                <NavLink to={`/list/${cat}`} className="cat" activeClassName="active" 
                  onClick={scroll} key={cat}>{t(cat)}</NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlBar;
