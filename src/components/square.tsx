import * as React from 'react';
import { formatNumberShorter } from '../utils'

interface Props {
  symbol?: string,
  children: string | number | JSX.Element | JSX.Element[]
}

function Square(props: Props) {

  const {symbol, children} = props;

  return (
    <div className="square">
      {
        typeof symbol !== 'undefined'
          ? <div className="symbol">{symbol}</div>
          : ''
      }
      <div className="values">
        {
          typeof children === 'number'
            ? formatNumberShorter(children)
            : children
        }
      </div>
    </div>
  )
}

export default Square;
