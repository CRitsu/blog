import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES_MAPPING, MEMO, PHOTO, TALK, TECH } from 'src/constants';
import { Translate } from '../../types';


interface Props extends Translate {
  top: number,
  category: string,
  p: (p: string) => void,
}

interface State {
  bar: React.RefObject<HTMLDivElement>,
  wrapperClassName: string,
  input: React.RefObject<HTMLInputElement>,
}


/**
 * Control bar for switch tabs and search.
 * @param props activeTab and t translate function
 */
class ControlBar extends React.Component<Props, State> {

  public categoryNames = [TECH, MEMO, PHOTO, TALK];

  public constructor(props: Props) {
    super(props);

    this.state = {
      bar: React.createRef<HTMLDivElement>(),
      input: React.createRef<HTMLInputElement>(),
      wrapperClassName: '',
    };

    this.handleScrollChanged = this.handleScrollChanged.bind(this);
    this.handleOnfocus = this.handleOnfocus.bind(this);
    this.handleOnblur = this.handleOnblur.bind(this);
    this.getWrapperActiveClass = this.getWrapperActiveClass.bind(this);
    this.clickToScroll = this.clickToScroll.bind(this);
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
  public getWrapperClassNames() {
    const { wrapperClassName, bar } = this.state;

    // when current scroll position is over the bar
    if (this.getOffsetTop(bar) < window.pageYOffset) {
      // set class name only when current class name is not 'hold'
      if (wrapperClassName === '') {
        return 'hold';
      }
    } else {
      // reset class name only when it is not ''
      if (wrapperClassName === 'hold') {
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
  public handleScrollChanged() {
    const wrapperClassName = this.getWrapperClassNames();
    if (wrapperClassName !== undefined) {
      this.setState({ wrapperClassName });
    }
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
    window.addEventListener('scroll', this.handleScrollChanged);
    // fix position when switch active tab
    const wrapperClassName = this.getWrapperClassNames();
    if (wrapperClassName !== undefined) {
      this.setState({ wrapperClassName });
    }
  }

  /**
   * Unload event listener.
   */
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollChanged);
  }

  /**
   * @inheritdoc
   * 
   * Update category when path is changed and category is not correct.
   */
  public componentDidUpdate() {
    const path = window.location.pathname;
    const category = CATEGORIES_MAPPING[path];
    if (this.props.category !== category) {
      this.props.p(category);
    }
  }

  /**
   * Click to scroll to list top.
   */
  public clickToScroll() {
    window.scrollTo(0, this.props.top);
  }

  /**
   * Get current active class.
   * @param name menu name
   */
  public getWrapperActiveClass() {
    const test = /\/list\/(tech|memo|photo|talk)/;
    const path = window.location.pathname;
    if (test.test(path)) {
      return 'active';
    }
    return '';
  }

  public render() {
    const { t } = this.props;
    const { bar, wrapperClassName, input } = this.state;

    // edit class name
    const className = 'real-bar ' + wrapperClassName;

    const {
      categoryNames,
      getWrapperActiveClass,
      clickToScroll,
    } = this;

    return (
      <div className="control-bar" ref={bar}>
        <div className={className}>
          <div className="tabs">
            <NavLink to="/" exact={true} className="tab" onClick={clickToScroll}>{t('latest')}</NavLink>
            <NavLink to="/list/tech" className={`tab ${getWrapperActiveClass()}`} onClick={clickToScroll}>{t('categories')}</NavLink>
            <NavLink to="/list/tags" className="tab" onClick={clickToScroll}>{t('tags')}</NavLink>
          </div>
          <div className="search-area">
            <label className="magnifier">
              <span className="query-mark" />
              <input className="search" placeholder={t('search')} ref={input}
                onFocus={this.handleOnfocus} onBlur={this.handleOnblur} />
            </label>
          </div>
          <div className={`categories-menu-wrapper ${getWrapperActiveClass()}`}>
            <div className="categories-menu">
              {categoryNames.map(cat => (
                <NavLink to={`/list/${cat.toLowerCase()}`} className="cat" key={cat} onClick={clickToScroll}>{t(cat.toLowerCase())}</NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlBar;
