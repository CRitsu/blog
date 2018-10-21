import * as React from 'react';
import Block from './Block';

interface Props {
  children: string
}


class Loading extends React.Component<Props> {

  public render() {

    const loading = this.props.children;

    return (
      <div className="loading">
        <span>{loading}</span>
        <Block />
        <Block />
        <Block />
      </div>
    )
  }
}

export default Loading;
