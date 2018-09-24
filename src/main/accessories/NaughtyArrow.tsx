import * as React from 'react';


class NaughtyArrow extends React.Component<object, object> {

  public position: React.RefObject<HTMLDivElement>;

  public constructor(props: any) {
    super(props);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.position = React.createRef();
  }

  public handleMousemove(e: MouseEvent) {
    // get reference of this element
    const current = this.position.current;
    if (current !== null) {
    // get coordinate of this element
      const rect = current.getBoundingClientRect();
      // type safe check
      if (this.isDOMRect(rect)) {
        
        console.log(this.calculateMidpoint(rect));
      }
    }
  }

  public isDOMRect(rect: ClientRect | DOMRect): rect is DOMRect {
    return 'x' in rect && 'y' in rect
      && 'width' in rect && 'height' in rect;
  }

  public calculateMidpoint(rect: DOMRect) {
    return {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    }
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
