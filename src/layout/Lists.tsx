import * as React from 'react';
import { translate } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { Square } from '../components';
import { CATEGORIES, LATEST, size } from '../constants';
import { Articles } from '../type';
import { formatDate } from '../utils';


interface Props {
  lists: Articles[],
  width: number,
  t: (p: string) => string
}

interface State {
  activeTab: number
}

class Lists extends React.Component<Props, State> {

  public state = {
    // 1: latest; 2: categories
    activeTab: LATEST
  }

  public constructor(props: Props) {
    super(props);
    this.handleSwitchTabs = this.handleSwitchTabs.bind(this);
  }

  public handleSwitchTabs(tab: number) {
    this.setState({activeTab: tab});
  }

  public render() {

    const { lists, width, t } = this.props;

    const { activeTab } = this.state;

    const listWidth = width > size.LIST_MAX_WIDTH ? size.LIST_MAX_WIDTH : width;

    // edit list
    const EditedList = (props: { match: boolean }) => (
      <div className={'list-contents ' + (props.match ? '' : 'hide')}>
        {
          lists.map(
            item => (
              <div key={item._id} className="item">
                <Square className="date">{formatDate(item.timestamp)}</Square>
                <div className="item-title">
                  <Link to={'/articles/' + item._id}>{item.title}</Link>
                </div>
                <Square className="tags" symbol="Tags">
                  {
                    item.tags.map(
                      tag => <div key={tag}><Link className="tag" to="">{tag}</Link></div>
                    )
                  }
                </Square>
              </div>
            )
          )
        }
      </div>
    )

    const calculateListsLeft = (match: boolean) => {
      return (
        match
          ? window.innerWidth > size.MIN_WIDTH ? '3rem' : 0
          : (width * -1) - 200
      )
    };

    // wrapper for hide scroll bar
    const calculateListsClasses = (match: boolean) => {
      return match ? 'lists-wrapper matched' : 'lists-wrapper';
    }

    const calculateActiveTabClasses = (active: boolean) => {
      if (active) {
        return 'tabs active';
      } else {
        return 'tabs';
      }
    }

    const switch2Latest = () => this.handleSwitchTabs(LATEST);
    const switch2Categories = () => this.handleSwitchTabs(CATEGORIES);

    return (
      <Route path="/" exact={true}>
        {
          (props: { match: boolean }) =>
            <div className="lists-container"
              style={{
                left: props.match ? 0 : width * -1,
                width
              }}>
              <div className={calculateListsClasses(props.match)}
                style={{
                  left: calculateListsLeft(props.match),
                  width: listWidth
                }}>
                <div className="lists">
                  <div className="header">
                    <div className="sign">Time flies so fast.</div>
                    <div className="sub-bar">
                      <div className="categories">
                        <div onClick={switch2Latest}
                          className={calculateActiveTabClasses(activeTab === LATEST)}>
                          {t('latest')}
                        </div>
                        <div onClick={switch2Categories}
                          className={calculateActiveTabClasses(activeTab === CATEGORIES)}>
                          {t('categories')}
                        </div>
                      </div>
                      <div className="search">
                        <input className="input" placeholder={t('Search')} />
                      </div>
                    </div>
                  </div>
                  <EditedList match={props.match} />
                </div>
              </div>
            </div>
        }
      </Route>
    )
  }
}


export default translate()(Lists);
