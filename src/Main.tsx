import * as React from 'react';
import Square from './components/square';
import Title from './components/title';
import * as icon from './constants/iconCodes';
import './css/Main.css';


interface Articles {
  _id: string,
  author: string,
  peek: string,
  reviews: number,
  tags: string[],
  timestamp: number,
  title: string,
  views: number,
  deleted: boolean
}

interface Props {
  title: string,
  lists: Articles[]
}

class Main extends React.Component<Props, object> {
  public render() {

    const {title, lists} = this.props;

    return (
      <div className="main">
        <Title title={title} />
        
        <div className="lists">
          {
            lists.map(
              item => (
                <div key={item._id} className="item">
                  <div className="item-title">{item.title}</div>
                  <div className="peek">{item.peek}</div>
                  <div className="badges">
                    <Square symbol={icon.calendar} text={new Date(item.timestamp).toLocaleString()} />
                    <Square symbol={icon.views} text={item.views} />
                    <Square symbol={icon.comment} text={item.reviews} />
                    {
                      item.tags.map(
                        tag => (
                          <Square symbol={icon.tag} text={tag} />
                        )
                      )
                    }
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    )
  }
}


export default Main;
