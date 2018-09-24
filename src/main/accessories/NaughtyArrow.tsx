import * as React from 'react';


interface State {
  position: React.RefObject<HTMLDivElement>,
  midpoint?: {
    x: number,
    y: number
  }
}


class NaughtyArrow extends React.Component<object, State> {

  /**
   * The constructor.
   * 
   * For bind `this` instance and initialize the state
   */
  public constructor(props: any) {
    super(props);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.state = {
      position: React.createRef(),
    }
  }

  /**
   * Handler for mouse move.
   * 
   * Change the position of the arrow component,
   * depends the current position of mouse cursor.
   * @param e instance of mouse event
   */
  public handleMousemove(e: MouseEvent) {
    console.log(this.state.midpoint);
  }

  /**
   * Check if the object is an instance of `DOMRect` or not.
   * @param rect the result of `getBoundingClientRect` function
   */
  public isDOMRect(rect: ClientRect | DOMRect): rect is DOMRect {
    return 'x' in rect && 'y' in rect
      && 'width' in rect && 'height' in rect;
  }

  /**
   * Calculate the midpoint of the main component.
   * 
   * @param rect instance of `DOMRect` interface
   */
  public calculateMidpoint(rect: DOMRect) {
    return {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    }
  }

  /**
   * Do these thing when arrow component was mounted:
   * - add event listener for mouse move
   * - calculate the midpoint for arrow component
   */
  public componentDidMount() {
    // add event listener for mouse move
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

  /**
   * Clean up event listener before component was unmounted.
   */
  public componentWillUnmount() {
    // remove mouse move event listener
    window.removeEventListener('mousemove', this.handleMousemove);
  }

  /**
   * Main render.
   */
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
