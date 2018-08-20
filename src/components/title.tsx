import * as React from 'react';


interface Props {
  title?: string,
  children?: JSX.Element
}

function Title(props: Props) {

  const { title, children } = props;

  if (title !== undefined) {
    return (
      <h1 className="title">{props.title}</h1>
    )
  } else if (children !== undefined) {
    return (
      <h1>
        {props.children}
      </h1>
    )
  } else {
    return (
      <h1>
        No value passed
      </h1>
    )
  }
}

export default Title;
