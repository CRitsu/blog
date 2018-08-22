import * as React from 'react';
import { formatNumberShorter } from '../utils'

interface Props {
  symbol: string,
  text?: string | number,
  child?: JSX.Element | JSX.Element[]
}

function Square(props: Props) {

  const {symbol, child} = props;
  let {text} = props;

  // holder
  let holder;

  // if text exists
  if (text !== undefined) {
    // apply format if text is a number
    if ('number' === typeof text) {
      text = formatNumberShorter(text);
    }
    // assign to holder
    holder = text;
  } else if (child !== undefined) {
    // if child is not undefined then assign to holder
    holder = child;
  } else {
    // if no value matched put a dummy values
    holder = 'No Values';
  }

  return (
    <div className="square">
      <div className="symbol">{symbol}</div>
      <div className="values">{holder}</div>
    </div>
  )
}

export default Square;
