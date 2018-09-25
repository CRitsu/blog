import * as React from 'react';


interface State {
  position: React.RefObject<HTMLDivElement>,
  shouldAction: boolean,
  midpoint?: Coordinate
}

interface Coordinate {
  x: number,
  y: number
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
      // ref of arrow component for get midpoint
      position: React.createRef(),
      // action flag, should not acts at small mobile screen
      shouldAction: window.innerWidth > 768
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
    
    const current = this.state.position.current;
    const midpoint = this.state.midpoint;

    if (current !== null && midpoint) {
      // definition of some constants
      const maxDistance = 200;
      const maxOffset = 80;

      // for adjust css style
      const style = current.style;

      // get position of mouse cursor
      const mouse = {
        x: e.clientX,
        y: e.clientY + window.pageYOffset
      }

      // calculate the distance between mouse cursor and midpoint
      const distance = this.calculateDistance(mouse, midpoint);

      // only do the action when the distance is less than max distance
      if (distance < maxDistance) {
        // calculate the offset distance
        // distance 0 to max is mapping to 60 to 0
        // it means less distance will get large offset
        const offset = maxOffset - maxOffset * distance / maxDistance;

        // the ratio for calculate the offset point
        const ratio = offset / distance;

        // treat it as a right angled triangle
        // get the length of line a and line b
        const a = Math.abs(midpoint.x - mouse.x);
        const b = Math.abs(midpoint.y - mouse.y);

        // calculate the offset with ratio
        let offsetX = a * ratio;
        let offsetY = b * ratio;

        // check the direction
        offsetX = mouse.x < midpoint.x ? offsetX : - offsetX;
        offsetY = mouse.y < midpoint.y ? offsetY : - offsetY;

        // apply new position
        style.left = `${offsetX}px`;
        style.top = `${offsetY}px`;

      // reset position when mouse move out of action area
      } else {
        style.left = '0px';
        style.top = '0px';
      }
    }
  }

  /**
   * Calculate the distance between two points,
   * by treat it as a right angled triangle,
   * and calculate the hypotenuse of the triangle.
   * @param p1 point 1
   * @param p2 point 2
   */
  public calculateDistance(p1: Coordinate, p2: Coordinate) {
    // if two points make a vertical line
    if (p1.x === p2.x) {
      const r = Math.abs(p1.y - p2.y);
      return Math.round(r);
      // if two points make a horizon line
    } else if (p1.y === p2.y) {
      const r = Math.abs(p1.x - p2.x);
      return Math.round(r);
      // two points make a right angled triangle
    } else {
      const a = Math.abs(p1.x - p2.x);
      const b = Math.abs(p1.y - p2.y);
      const r = Math.sqrt(a ** 2 + b ** 2);
      return Math.round(r);
    }
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
      y: rect.y + rect.height / 2 - 25 // fix margin bottom of arrow
    }
  }

  /**
   * Do these thing when arrow component was mounted:
   * - add event listener for mouse move
   * - calculate the midpoint for arrow component
   */
  public componentDidMount() {
    //  check if it is not a small screen
    if (this.state.shouldAction) {
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
  }

  /**
   * Clean up event listener before component was unmounted.
   */
  public componentWillUnmount() {
    if (this.state.shouldAction) {
      // remove mouse move event listener
      window.removeEventListener('mousemove', this.handleMousemove);
    }
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
