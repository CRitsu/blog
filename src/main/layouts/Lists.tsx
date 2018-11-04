import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CATEGORIES_MAPPING } from 'src/constants';
import { categoryChange, fetchList, listInitialized } from 'src/reducers/creators';
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
    const { initialFlag, category } = this.props;
    const dispatch = this.props.dispatch;
    // `dispatch` is available and is not initialized already
    if (dispatch !== undefined && !initialFlag) {
      dispatch(listInitialized());
      this.performFetchingList(category);
    }
  }

  /**
   * Perform the list fetching action.
   * @param p path name
   */
  public performFetchingList(p: string) {

    const dispatch = this.props.dispatch;
    // condition of fetch action
    if (dispatch !== undefined) {
      const type = CATEGORIES_MAPPING[p];
      if (type !== undefined) {
        dispatch(fetchList(type));
      }
    }

  }

  /**
   * Update newest category to store.
   * @param c category
   */
  public setCategory(c: string) {
    const {category, dispatch} = this.props;
    const cat = CATEGORIES_MAPPING[c];
    if (category !== cat) {
      if (dispatch !== undefined) {
        console.log(cat)
        dispatch(categoryChange(cat));
      }
    }
  }

  public render() {

    const { list, listTopPoint, loading, t, category } = this.props;
    const { setCategory } = this;

    return (
      <div className="lists">
        <ControlBar category={category} t={t} top={listTopPoint} p={setCategory} />
        <EditedList list={list} more={t('load more')} />
        {loading
          ? <Loading>{t('loading')}</Loading>
          : null
        }
      </div>
    )
  }
}


export default translate()(Lists);
