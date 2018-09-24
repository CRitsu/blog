import * as React from 'react';


interface State {
  position: React.RefObject<HTMLDivElement>,
  midpoint?: {
    x: number,
    y: number
  }
}


class NaughtyArrow extends React.Component<object, State> {

  public constructor(props: any) {
    super(props);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.state = {
      position: React.createRef(),
    }
  }

  public handleMousemove(e: MouseEvent) {
    console.log(this.state.midpoint);
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

    // set midpoint when component was mounted
    // get reference of this element
    const current = this.state.position.current;
    if (current !== null) {
      // get coordinate of this element
      const rect = current.getBoundingClientRect();
      // type safe check
      if (this.isDOMRect(rect)) {
        this.setState({
          midpoint: this.calculateMidpoint(rect)
        });
      }
    }
  }

  public render() {

    const { position } = this.state;

    return (
      <div className="dont-touch-me" ref={position}>
        <div className="arrow"><div className="inner-shadow" /></div>
      </div>
    )
  }
}

export default NaughtyArrow;
