import * as React from 'react';
import Title from './components/title';

interface Articles {
  _id: string,
  author: string,
  peek: string,
  reviews: number,
  tags: string[],
  timestamp: number,
  title: string,
  views: number
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
