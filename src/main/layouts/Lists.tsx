import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchList, listInitialized, switchActiveTab } from 'src/reducers/creators';
import { Block } from '../../components';
import { Articles, ListsType, Translate } from '../../types';
import { formatDate } from '../../utils';
import ControlBar from '../accessories/ControlBar';


interface Props extends Translate, ListsType { }

/**
 * Create articles list.
 * @param props array of articles
 */
function EditedList(props: { list: Articles[], more: string }) {
  const { list, more } = props;

  const Timestamp = (p: { time: number }) => {

    const t = formatDate(p.time).split('\n');

    return (
      <div className="timestamp">
        {t[0]}<br />{t[1]}
      </div>
    )
  }

  if (list.length === 0) {
    return null;
  }

  return (
    <div className={'list-contents'}>
      {list.map(item => (
        <div key={item._id} className={`item ${item.category}`}>
          <Block />
          <Timestamp time={item.timestamp} />
          <Link className="item-title" to={'/articles/' + item._id}>{item.title}</Link>
        </div>
      ))}
      <button className="more">{more}</button>
    </div>
  )
}



class Lists extends React.Component<Props> {

  public constructor(props: Props) {
    super(props);
    this.handleSwitchActiveTab = this.handleSwitchActiveTab.bind(this);
  }

  public componentDidMount() {
    // fetch list
    const { initialFlag, activeTab } = this.props;
    const dispatch = this.props.dispatch;
    // condition of fetch action
    // `dispatch` is available and is not initialized already
    if (dispatch !== undefined && !initialFlag) {
      dispatch(listInitialized());
      dispatch(fetchList(activeTab));
    }
  }

  /**
   * Switch active tab.
   * @param tab tab index
   */
  public handleSwitchActiveTab(tab: number) {
    const { dispatch, activeTab } = this.props;
    // nothing changed
    if (tab === activeTab) {
      return;
    }
    // changing active tab
    if (dispatch !== undefined) {
      dispatch(switchActiveTab(tab));
    }
  }

  public render() {

    const { activeTab, list, loading, t } = this.props;

    const Loading = () => (
      <div className="loading">
        <span>{t('loading')}</span>
        <Block />
        <Block />
        <Block />
      </div>
    )

    return (
      <div className="lists">
        <ControlBar t={t} activeTab={activeTab} onSwitchTab={this.handleSwitchActiveTab} />
        <EditedList list={list} more={t('load more')} />
        {loading
          ? <Loading />
          : null
        }
      </div>
    )
  }
}


export default translate()(Lists);
