import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Block } from '../../components';
import { LATEST } from '../../constants';
import { Articles, Translate } from '../../types';
import { formatDate } from '../../utils';
import ControlBar from '../accessories/ControlBar';


interface Props extends Translate {
  lists: Articles[]
}

interface ActiveTab {
  activeTab: number
}

/**
 * Create articles list.
 * @param props array of articles
 */
function EditedList(props: { lists: Articles[] }) {
  const lists = props.lists;

  const Timestamp = (p: {time: number}) => {

    const t = formatDate(p.time).split('\n');

    return (
      <div className="timestamp">
        {t[0]}<br/>{t[1]}
      </div>
    )
  }

  return (
    <div className={'list-contents'}>
      {lists.map(item => (
        <div key={item._id} className={`item ${item.category}`}>
          <Block />
          <Timestamp time={item.timestamp} />
          <Link className="item-title" to={'/articles/' + item._id}>{item.title}</Link>
        </div>
      ))}
    </div>
  )
}



class Lists extends React.Component<Props, ActiveTab, { store: object }> {

  public state = {
    activeTab: LATEST
  }

  public render() {

    const store = this.context;
    console.log(store);

    const { lists, t } = this.props;
    const activeTab = this.state.activeTab;

    return (
      <div className="lists">
        <ControlBar t={t} activeTab={activeTab} />
        <EditedList lists={lists} />
        <button className="more">{t('load more')}</button>
      </div>
    )
  }
}


export default translate()(Lists);
