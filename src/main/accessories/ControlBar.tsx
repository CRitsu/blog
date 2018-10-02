import * as React from 'react';
import { CATEGORIES, LATEST, TAGS } from '../../constants';
import { Translate } from '../../types';


interface Props extends Translate {
  activeTab: number
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
   * Handler for scroll event.
   * 
   * Set position when scroll over the control bar.
   */
  public handleScroll() {
    const { cls, bar } = this.state;

    // when current scroll position is over the bar
    if (this.getOffsetTop(bar) < window.pageYOffset) {
      // set class name only when current class name is not 'hold'
      if (cls === '') {
        this.setState({ cls: 'hold' });
      }
    } else {
      // reset class name only when it is not ''
      if (cls === 'hold') {
        this.setState({ cls: '' });
      }
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
  }

  /**
   * Unload event listener.
   */
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  public render() {
    const { activeTab, t } = this.props;
    const { bar, cls, input } = this.state;

    // edit class name
    const className = 'real-bar ' + cls;

    // edit active tab's class name
    const applyActive = (name: number) => {
      if (name === activeTab) {
        return 'tab active';
      } else {
        return 'tab';
      }
    }

    return (
      <div className="control-bar" ref={bar}>
        <div className={className}>
          <div className="tabs">
            <button className={applyActive(LATEST)}>{t('latest')}</button>
            <button className={applyActive(CATEGORIES)}>{t('categories')}</button>
            <button className={applyActive(TAGS)}>{t('tags')}</button>
          </div>
          <div className="search-area">
            <label className="magnifier">
              <span className="query-mark" />
              <input className="search" placeholder={t('search')} ref={input}
                onFocus={this.handleOnfocus} onBlur={this.handleOnblur} />
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlBar;
