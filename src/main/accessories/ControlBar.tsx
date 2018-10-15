import * as React from 'react';
import { CATEGORIES, LATEST, MEMO, PHOTO, TAGS, TALK, TECH } from '../../constants';
import { Translate } from '../../types';


interface Props extends Translate {
  activeTab: number,
  onSwitchTab: (tab: number) => void,
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
    const { activeTab, t, onSwitchTab } = this.props;
    const { bar, cls, input } = this.state;

    // edit class name
    const className = 'real-bar ' + cls;

    // for latest/categories/tags
    const O = 0;
    // for tech/memo/photo/talk
    const I = 1;

    // edit active tab's class name
    const applyActive = (name: number, mode = O) => {
      if (mode === O) {
        const at = activeTab > 9 ? Math.floor(activeTab / 10) : activeTab;
        if (name === at) {
          return 'active';
        }
      } else if (mode === I) {
        const at = activeTab;
        if (name === at) {
          return 'cat active';
        } else {
          return 'cat';
        }
      }
      return '';
    };

    const getCategoryMenuClassName = () => {
      const cn = 'categories-menu';
      if (Math.floor(activeTab / 10) === CATEGORIES) {
        return cn + ' active';
      } else {
        return cn;
      }
    }

    const switch2latest = () => onSwitchTab(LATEST);
    const switch2tech = () => onSwitchTab(TECH);
    const switch2memo = () => onSwitchTab(MEMO);
    const switch2photo = () => onSwitchTab(PHOTO);
    const switch2talk = () => onSwitchTab(TALK);
    const switch2tags = () => onSwitchTab(TAGS);


    return (
      <div className="control-bar" ref={bar}>
        <div className={className}>
          <div className="tabs">
            <button className={`tab ${applyActive(LATEST)}`} onClick={switch2latest}>{t('latest')}</button>
            <button className={`tab ${applyActive(CATEGORIES)}`} onClick={switch2tech}>{t('categories')}</button>
            <button className={`tab ${applyActive(TAGS)}`} onClick={switch2tags}>{t('tags')}</button>
          </div>
          <div className="search-area">
            <label className="magnifier">
              <span className="query-mark" />
              <input className="search" placeholder={t('search')} ref={input}
                onFocus={this.handleOnfocus} onBlur={this.handleOnblur} />
            </label>
          </div>
          <div className={getCategoryMenuClassName()}>
            <button className={applyActive(TECH, I)} onClick={switch2tech} >{t('tech')}</button>
            <button className={applyActive(MEMO, I)} onClick={switch2memo} >{t('memo')}</button>
            <button className={applyActive(PHOTO, I)} onClick={switch2photo} >{t('photo')}</button>
            <button className={applyActive(TALK, I)} onClick={switch2talk} >{t('talk')}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlBar;
