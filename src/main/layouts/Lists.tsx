import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { categoryChange, fetchList } from 'src/reducers/creators';
import { Articles, CommonType, ListsType, Translate } from '../../types';
import { formatDate } from '../../utils';
import Block from '../accessories/Block';
import ControlBar from '../accessories/ControlBar';
import Loading from '../accessories/Loading';


interface Props extends Translate, ListsType, CommonType { }

/**
 * Create articles list.
 * @param props array of articles
 */
function EditedList(props: { list: Articles[] }) {
  const { list } = props;

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
    </div>
  )
}



class Lists extends React.Component<Props> {

  public constructor(props: Props) {
    super(props);
    this.performFetchingList = this.performFetchingList.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }

  /**
   * @inheritdoc
   * 
   * Check initialFlag and fetch list when it is not initialed.
   */
  public componentDidMount() {
    // fetch list
    const { list } = this.props;
    const dispatch = this.props.dispatch;
    // `dispatch` is available and is not initialized already
    if (dispatch !== undefined && list.length === 0) {
      this.performFetchingList();
    }
  }

  /**
   * Perform the list fetching action.
   * 
   * Only do when mounted.
   * @param cat category
   */
  public performFetchingList() {

    const dispatch = this.props.dispatch;
    // condition of fetch action
    if (dispatch !== undefined) {
      dispatch(fetchList());
    }

  }

  /**
   * Update newest category to store.
   * @param c category
   */
  public setCategory(c: string) {
    const { category, dispatch } = this.props;
    if (category !== c) {
      if (dispatch !== undefined) {
        // change category, fetch new list when nothing was cached
        dispatch(categoryChange(c));
      }
    }
  }

  public render() {

    const { list, listTopPoint, t, category } = this.props;
    const { setCategory } = this;

    return (
      <div className="lists">
        <ControlBar category={category} t={t} top={listTopPoint} p={setCategory} />
        <EditedList list={list} />
        {list.length === 0
          ? <Loading>{t('loading')}</Loading>
          : <button className="more">{t('load more')}</button>
        }
      </div>
    )
  }
}


export default translate()(Lists);
