import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LATEST, MEMO, PHOTO, TAGS, TALK, TECH } from 'src/constants';
import { fetchList, listInitialized } from 'src/reducers/creators';
import { Articles, CommonType, ListsType, Translate } from '../../types';
import { formatDate } from '../../utils';
import Block from '../accessories/Block';
import ControlBar from '../accessories/ControlBar';


interface Props extends Translate, ListsType, CommonType { }

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

  public componentDidMount() {
    // fetch list
    const { initialFlag } = this.props;
    const dispatch = this.props.dispatch;
    // condition of fetch action
    // `dispatch` is available and is not initialized already
    if (dispatch !== undefined && !initialFlag) {
      const type = this.getListFetchType();
      if (type !== null) {
        dispatch(listInitialized());
        dispatch(fetchList(type));
      }
    }
  }

  // get list type by current path
  public getListFetchType() {
    const path = window.location.pathname;
    switch (path) {
      case '/':
        return LATEST;
      case '/list/tech':
        return TECH;
      case '/list/memo':
        return MEMO;
      case '/list/photo':
        return PHOTO;
      case '/list/talk':
        return TALK;
      case '/list/tags':
        return TAGS;
      default:
        return null;
    }
  }

  public render() {

    const { list, listTopPoint, loading, t } = this.props;

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
        <ControlBar t={t} top={listTopPoint} />
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
