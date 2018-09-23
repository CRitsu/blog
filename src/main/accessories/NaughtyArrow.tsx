import * as React from 'react';


class NaughtyArrow extends React.Component<object, object> {

  public position: React.RefObject<HTMLDivElement>;

  public constructor(props: any) {
    super(props);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.position = React.createRef()
  }

  public handleMousemove(e: MouseEvent) {
    const current = this.position.current;
    if (current !== null) {
      const rect = current.getBoundingClientRect();
      console.log(this.calculateMidpoint(rect));
    }
  }

  public calculateMidpoint(rect: ClientRect | DOMRect) {

    if ('x' in rect && 'y' in rect) {
      return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
      }
    }
    return;
  }

  public componentDidMount() {
    window.addEventListener('mousemove', this.handleMousemove);
  }

  public render() {

    const position = this.position;

    return (
      <div className="dont-touch-me" ref={position}>
        <div className="arrow"><div className="inner-shadow" /></div>
      </div>
    )
  }
}

export default NaughtyArrow;
