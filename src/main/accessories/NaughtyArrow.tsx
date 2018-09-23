import * as React from 'react';


class NaughtyArrow extends React.Component<object, object> {

  public position = React.createRef();

  public constructor(props: any) {
    super(props);
    this.handleMousemove = this.handleMousemove.bind(this);
  }

  public handleMousemove(e: MouseEvent) {
    console.log(this.position);
  }

  public componentDidMount() {
    window.addEventListener('mousemove', this.handleMousemove);
  }

  public render() {
    return (
      <div className="dont-touch-me">
        <div className="arrow"><div className="inner-shadow" /></div>
      </div>
    )
  }
}

export default NaughtyArrow;
