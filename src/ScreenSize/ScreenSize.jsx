/* eslint-disable no-extend-native */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import config from '@plone/volto/registry';
import { updateScreen } from '../actions';
import { detectTouchScreen } from '../utils';

Number.prototype.toPixel = function toPixel() {
  return `${this}px`;
};

const debounce = (func) => {
  let timer;
  return (event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, config.settings.resizeDebounce, event);
  };
};

const ScreenSize = (props) => {
  const mounted = React.useRef(false);
  const { content = {} } = props;

  const updateScreen = (initialState = {}) => {
    const screen = {
      height: window.screen.availHeight || 0,
      width: window.screen.availWidth || 0,
    };

    const page = {
      height: window.innerHeight || 0,
      width: window.innerWidth || 0,
    };

    const newScreen = {
      ...initialState,
      ...screen,
      page,
      content: {
        offsetTop:
          document.querySelector('div.content-area')?.offsetTop || null,
      },
    };

    props.updateScreen(newScreen);
  };

  React.useEffect(() => {
    if (__CLIENT__) {
      if (!mounted.current) {
        updateScreen({
          hasTouchScreen: detectTouchScreen(),
          browserToolbarHeight: window.outerHeight - window.innerHeight,
        });
        window.addEventListener('resize', debounce(updateScreen));
      }
      updateScreen();
    }
    mounted.current = true;
    return () => {
      if (__CLIENT__) {
        window.removeEventListener('resize', debounce(updateScreen));
      }
      mounted.current = false;
    };
    /* eslint-disable-next-line */
  }, [content['@id']]);

  return '';
};

export default compose(
  connect(
    (state) => ({
      screen: state.screen,
    }),
    { updateScreen },
  ),
)(ScreenSize);
