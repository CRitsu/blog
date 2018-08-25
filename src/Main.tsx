import * as React from 'react';
import { Route } from 'react-router-dom';
import { Square, TitleWithLink as Title } from './components';
import { icons } from './constants';
import './css/Main.css';
import { Articles } from './type';


interface Props {
  lists: Articles[]
}

class Main extends React.Component<Props, object> {
  public render() {

    const { lists } = this.props;

    const time = (t: number) => new Date(t).toLocaleString();

    return (
      <div className="main">

        <Title link="/">Richard's Blog</Title>

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
                        <Square symbol={icons.calendar}>{time(item.timestamp)}</Square>
                        <Square symbol={icons.views}>{item.views}</Square>
                        <Square symbol={icons.comment}>{item.reviews}</Square>
                      </div>
                      <Square symbol={icons.tags}>
                        {
                          item.tags.map(
                            tag => (
                              <div key={tag}>{tag}</div>
                            )
                          )
                        }
                      </Square>
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
