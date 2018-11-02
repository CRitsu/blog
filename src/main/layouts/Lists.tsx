import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { categories } from 'src/constants';
import { fetchList, listInitialized } from 'src/reducers/creators';
import { Articles, CommonType, ListsType, Translate } from '../../types';
import { formatDate } from '../../utils';
import Block from '../accessories/Block';
import ControlBar from '../accessories/ControlBar';
import Loading from '../accessories/Loading';


interface Props extends Translate, ListsType, CommonType { }

interface State {
  category: string,
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



class Lists extends React.Component<Props, State> {

  public state = {
    category: window.location.pathname,
  }

  public constructor(props: Props) {
    super(props);
    this.performFetchingList = this.performFetchingList.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }

  public componentDidMount() {
    // fetch list
    const { initialFlag } = this.props;
    const dispatch = this.props.dispatch;
    // `dispatch` is available and is not initialized already
    if (dispatch !== undefined && !initialFlag) {
      dispatch(listInitialized());
      this.performFetchingList(this.state.category);
    }
  }

  public performFetchingList(p: string) {

    const dispatch = this.props.dispatch;
    // condition of fetch action
    if (dispatch !== undefined) {
      const type = categories[p];
      if (type !== undefined) {
        dispatch(fetchList(type));
      }
    }

  }

  public componentDidUpdate(p: Props) {
    if (p.category !== this.state.category) {
      this.performFetchingList(this.state.category);
    }
  }

  public setCategory(c: string) {
    this.setState({ category: c })
  }

  public render() {

    const { list, listTopPoint, loading, t } = this.props;
    const { setCategory } = this;
    const { category } = this.state;

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
