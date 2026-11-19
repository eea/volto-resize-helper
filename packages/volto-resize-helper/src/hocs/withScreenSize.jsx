import React from 'react';
import { useSelector } from 'react-redux';

export default function withScreenSize(WrappedComponent) {
  return (props) => {
    const screen = useSelector((state) => state.screen);

    return <WrappedComponent {...props} screen={screen} />;
  };
}
