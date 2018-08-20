import * as React from 'react';
import { I18n } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { Square, Title } from './components';
import { icons } from './constants';
import './css/Main.css';
import { Articles } from './type';


interface Props {
  lists: Articles[]
}

class Main extends React.Component<Props, object> {
  public render() {

    const { lists } = this.props;

    return (
      <div className="main">

        <Title>
          <Link to="/">
            <I18n>
              {
                t => (
                  t('title')
                )
              }
            </I18n>
          </Link>
        </Title>

        <Route path="/" exact={true}>
          {(props: { match: boolean }) => props.match &&
            <div className="lists">
              {
                lists.map(
                  item => (
                    <div key={item._id} className="item">
                      <div className="item-title">{item.title}</div>
                      <div className="peek">{item.peek}</div>
                      <div className="badges">
                        <Square symbol={icons.calendar} text={new Date(item.timestamp).toLocaleString()} />
                        <Square symbol={icons.views} text={item.views} />
                        <Square symbol={icons.comment} text={item.reviews} />
                      </div>
                      <Square symbol={icons.tags} child={
                        item.tags.map(
                          tag => (
                            <div key={tag}>{tag}</div>
                          )
                        )
                      } />
                    </div>
                  )
                )
              }
            </div>
          }
        </Route>
      </div>
    )
  }
}


export default Main;
