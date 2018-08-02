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
    return (
      <div className="main">
        <Title title={this.props.title} />
        
        <div className="lists">
          {
            this.props.lists.map(
              item => (
                <div key={item._id} className="item">
                  <div>{item.title}</div>
                  <div className="badges">
                    <div>{new Date(item.timestamp).toLocaleString()}</div>
                    <Square symbol={icon.views} text={item.views} />
                    <Square symbol={icon.comment} text={item.reviews} />
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
