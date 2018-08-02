import * as React from 'react';


interface Props {
  symbol: string,
  text: string | number
}

function Square(props: Props) {
  // tslint:disable-next-line:prefer-const
  let {symbol, text} = props;
  if ('number' === typeof text) {
    if (text >= 1000000) {
      text = `${Math.floor(text / 1000000)}m`;
    } else if (text >= 1000) {
      text = `${Math.floor(text / 1000)}k`;
    }
  }

  return (
    <div className="square">
      <div className="symbol">{symbol}</div>
      <div className="square-text">{text}</div>
    </div>
  )
}

export default Square;
