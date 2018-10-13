import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchList, listInitialized } from 'src/reducers/creators';
import { Block } from '../../components';
import { LATEST } from '../../constants';
import { Articles, ListsType, Translate } from '../../types';
import { formatDate } from '../../utils';
import ControlBar from '../accessories/ControlBar';


interface Props extends Translate, ListsType { }

interface ActiveTab {
  activeTab: number
}

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



class Lists extends React.Component<Props, ActiveTab, { store: object }> {

  public state = {
    activeTab: LATEST
  }

  public componentDidMount() {
    // fetch list
    const { initialFlag } = this.props;
    const dispatch = this.props.dispatch;
    // condition of fetch action
    // `dispatch` is available and is not initialized already
    if (dispatch !== undefined && !initialFlag) {
      dispatch(listInitialized());
      dispatch(fetchList(this.state.activeTab));
    }
  }

  public render() {

    const { list, loading, t } = this.props;
    const activeTab = this.state.activeTab;

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
        <ControlBar t={t} activeTab={activeTab} />
        {loading
          ? <Loading />
          : <EditedList list={list} more={t('load more')} />
        }
      </div>
    )
  }
}


export default translate()(Lists);
