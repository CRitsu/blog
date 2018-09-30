import * as React from 'react';
import { isDOMRect } from '../../utils';


interface State {
  position: React.RefObject<HTMLDivElement>,
  shouldAction: boolean,
  rect?: DOMRect,
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
    this.handleClick = this.handleClick.bind(this);
    this.actionTrigger = this.actionTrigger.bind(this);

    this.state = {
      // ref of arrow component for get midpoint
      position: React.createRef(),
      // action flag, should not acts at small mobile screen
      shouldAction: window.innerWidth > 768
    }
  }

  /**
   * Handler for click,
   * scroll to next screen.
   */
  public handleClick() {
    const rect = this.state.rect;
    if (rect !== undefined) {
      // scroll to point
      // y of arrow plus height of arrow
      let targetPoint = rect.y + rect.height;
      // check if target point is greater then screen height
      // if not, set target point to screen height
      targetPoint = window.innerHeight < targetPoint 
        ? targetPoint : window.innerHeight;
      // apply scroll action
      window.scrollTo(0, targetPoint);
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
    const shouldAction = this.state.shouldAction;

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

      // do the action when:
      // - distance is less then the max distance
      // - shouldAction flag is true
      if (distance < maxDistance && shouldAction) {
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
   * Trigger for shouldAction flag.
   * 
   * Switch flag when `esc` button was pressed.
   * @param e keyboard event
   */
  public actionTrigger(e: KeyboardEvent) {
    // 27: esc
    if (e.which === 27) {
      console.log(1)
      const sa = this.state.shouldAction;
      this.setState({ shouldAction: !sa });
    }
  }

  /**
   * Do these thing when arrow component was mounted:
   * - add event listener for mouse move
   * - calculate the midpoint for arrow component
   */
  public componentDidMount() {
    // get reference of this element
    const current = this.state.position.current;

    if (current === null) {
      return;
    }

    // get coordinate of this element
    const rect = current.getBoundingClientRect();

    // type safe check
    if (!isDOMRect(rect)) {
      return;
    }

    //  check if it is not a small screen
    if (this.state.shouldAction) {
      // add event listener for mouse move and key board
      window.addEventListener('mousemove', this.handleMousemove);
      window.addEventListener('keydown', this.actionTrigger);
      // set midpoint when component was mounted
      this.setState({
        midpoint: this.calculateMidpoint(rect),
        rect
      });
      // set rect for handle click
    } else {
      this.setState({ rect });
    }
  }


  /**
   * Clean up event listener before component was unmounted.
   */
  public componentWillUnmount() {
    if (this.state.shouldAction) {
      // remove event listener
      window.removeEventListener('mousemove', this.handleMousemove);
      window.removeEventListener('keydown', this.actionTrigger);
    }
  }

  /**
   * Main render.
   */
  public render() {

    const { position } = this.state;

    return (
      <div className="dont-touch-me" ref={position}>
        <div className="arrow" onClick={this.handleClick}>
          <div className="inner-shadow" />
        </div>
      </div>
    )
  }
}

export default NaughtyArrow;
